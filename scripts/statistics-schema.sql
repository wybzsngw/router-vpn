-- 自建统计服务数据库结构
-- 适用于 Supabase/PostgreSQL

-- 1. 访问记录表（详细记录每次访问）
CREATE TABLE page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) NOT NULL,
    page_url TEXT NOT NULL,
    page_title VARCHAR(500),
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country VARCHAR(2),
    city VARCHAR(100),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    os VARCHAR(100),
    screen_resolution VARCHAR(20),
    language VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 用户会话表（跟踪用户会话）
CREATE TABLE user_sessions (
    id VARCHAR(255) PRIMARY KEY,
    first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_views INTEGER DEFAULT 1,
    total_duration INTEGER DEFAULT 0, -- 秒
    pages_visited TEXT[], -- 访问的页面数组
    is_bounce BOOLEAN DEFAULT true,
    exit_page TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 页面统计表（聚合数据）
CREATE TABLE page_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_url TEXT NOT NULL,
    page_title VARCHAR(500),
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    unique_views INTEGER DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0,
    avg_duration DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page_url, date)
);

-- 4. 来源统计表
CREATE TABLE traffic_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type VARCHAR(50) NOT NULL, -- direct, search, social, referral
    source_name VARCHAR(200),
    source_url TEXT,
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    unique_views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(source_type, source_name, date)
);

-- 5. 设备统计表
CREATE TABLE device_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_type VARCHAR(50) NOT NULL,
    browser VARCHAR(100),
    os VARCHAR(100),
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    unique_views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(device_type, browser, os, date)
);

-- 索引优化
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_page_views_page_url ON page_views(page_url);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);
CREATE INDEX idx_user_sessions_last_visit ON user_sessions(last_visit);
CREATE INDEX idx_page_stats_date ON page_stats(date);
CREATE INDEX idx_page_stats_page_url ON page_stats(page_url);

-- 分区表（按月分区，提高查询性能）
-- 注意：这需要在生产环境中根据实际需求调整
