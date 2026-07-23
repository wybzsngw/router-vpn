// 自建统计服务 API 实现
// 适用于 Supabase 后端

class StatisticsAPI {
    constructor(supabaseUrl, supabaseKey) {
        this.supabase = supabase.createClient(supabaseUrl, supabaseKey);
        this.sessionId = this.getOrCreateSessionId();
    }

    // 获取或创建会话ID
    getOrCreateSessionId() {
        let sessionId = localStorage.getItem('statistics_session_id');
        if (!sessionId) {
            sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('statistics_session_id', sessionId);
        }
        return sessionId;
    }

    // 记录页面访问
    async trackPageView(pageData = {}) {
        try {
            const viewData = {
                session_id: this.sessionId,
                page_url: pageData.url || window.location.href,
                page_title: pageData.title || document.title,
                referrer: pageData.referrer || document.referrer,
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                language: navigator.language,
                created_at: new Date().toISOString()
            };

            // 插入访问记录
            const { data, error } = await this.supabase
                .from('page_views')
                .insert([viewData]);

            if (error) throw error;

            // 更新会话信息
            await this.updateSession();

            // 异步更新聚合统计
            this.updateAggregatedStats(viewData);

            return { success: true, data };
        } catch (error) {
            console.error('统计记录失败:', error);
            return { success: false, error };
        }
    }

    // 更新用户会话
    async updateSession() {
        try {
            const { data: existingSession } = await this.supabase
                .from('user_sessions')
                .select('*')
                .eq('id', this.sessionId)
                .single();

            if (existingSession) {
                // 更新现有会话
                await this.supabase
                    .from('user_sessions')
                    .update({
                        last_visit: new Date().toISOString(),
                        total_views: existingSession.total_views + 1,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', this.sessionId);
            } else {
                // 创建新会话
                await this.supabase
                    .from('user_sessions')
                    .insert([{
                        id: this.sessionId,
                        first_visit: new Date().toISOString(),
                        last_visit: new Date().toISOString(),
                        total_views: 1,
                        pages_visited: [window.location.href],
                        created_at: new Date().toISOString()
                    }]);
            }
        } catch (error) {
            console.error('会话更新失败:', error);
        }
    }

    // 异步更新聚合统计
    async updateAggregatedStats(viewData) {
        try {
            const today = new Date().toISOString().split('T')[0];
            
            // 更新页面统计
            await this.upsertPageStats(viewData, today);
            
            // 更新来源统计
            await this.upsertTrafficSource(viewData, today);
            
            // 更新设备统计
            await this.upsertDeviceStats(viewData, today);
            
        } catch (error) {
            console.error('聚合统计更新失败:', error);
        }
    }

    // 获取统计数据
    async getStatistics(timeRange = '7d', pageUrl = null) {
        try {
            const endDate = new Date();
            const startDate = new Date();
            
            switch (timeRange) {
                case '1d':
                    startDate.setDate(endDate.getDate() - 1);
                    break;
                case '7d':
                    startDate.setDate(endDate.getDate() - 7);
                    break;
                case '30d':
                    startDate.setDate(endDate.getDate() - 30);
                    break;
                default:
                    startDate.setDate(endDate.getDate() - 7);
            }

            let query = this.supabase
                .from('page_stats')
                .select('*')
                .gte('date', startDate.toISOString().split('T')[0])
                .lte('date', endDate.toISOString().split('T')[0]);

            if (pageUrl) {
                query = query.eq('page_url', pageUrl);
            }

            const { data, error } = await query.order('date', { ascending: false });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('获取统计数据失败:', error);
            return { success: false, error };
        }
    }

    // 获取实时统计
    async getRealTimeStats() {
        try {
            const { data, error } = await this.supabase
                .from('page_views')
                .select('*')
                .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

            if (error) throw error;

            const stats = {
                totalViews: data.length,
                uniqueSessions: new Set(data.map(d => d.session_id)).size,
                topPages: this.getTopPages(data),
                trafficSources: this.getTrafficSources(data),
                devices: this.getDeviceStats(data)
            };

            return { success: true, data: stats };
        } catch (error) {
            console.error('获取实时统计失败:', error);
            return { success: false, error };
        }
    }

    // 辅助方法
    getTopPages(data) {
        const pageCounts = {};
        data.forEach(view => {
            pageCounts[view.page_url] = (pageCounts[view.page_url] || 0) + 1;
        });
        return Object.entries(pageCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);
    }

    getTrafficSources(data) {
        const sources = {};
        data.forEach(view => {
            const source = this.getTrafficSource(view.referrer);
            sources[source] = (sources[source] || 0) + 1;
        });
        return sources;
    }

    getDeviceStats(data) {
        const devices = {};
        data.forEach(view => {
            const device = this.getDeviceType(view.user_agent);
            devices[device] = (devices[device] || 0) + 1;
        });
        return devices;
    }

    getTrafficSource(referrer) {
        if (!referrer) return 'direct';
        if (referrer.includes('google')) return 'google';
        if (referrer.includes('baidu')) return 'baidu';
        if (referrer.includes('github')) return 'github';
        return 'referral';
    }

    getDeviceType(userAgent) {
        if (/Mobile|Android|iPhone/i.test(userAgent)) return 'mobile';
        if (/Tablet|iPad/i.test(userAgent)) return 'tablet';
        return 'desktop';
    }
}

// 导出API类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StatisticsAPI;
} else {
    window.StatisticsAPI = StatisticsAPI;
}
