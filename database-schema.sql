-- Tijaniyah Muslim App Database Schema
-- Run this in your Neon database console

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journal entries table
CREATE TABLE IF NOT EXISTS journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    mood VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_private BOOLEAN DEFAULT false,
    tags JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prayer times table
CREATE TABLE IF NOT EXISTS prayer_times (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    fajr VARCHAR(10) NOT NULL,
    dhuhr VARCHAR(10) NOT NULL,
    asr VARCHAR(10) NOT NULL,
    maghrib VARCHAR(10) NOT NULL,
    isha VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'GHS',
    payment_method VARCHAR(100) NOT NULL,
    receipt_url TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Live streams table
CREATE TABLE IF NOT EXISTS live_streams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    viewers INTEGER DEFAULT 0,
    is_live BOOLEAN DEFAULT true,
    quality VARCHAR(50)[] DEFAULT ARRAY['720p', '1080p'],
    current_quality VARCHAR(50) DEFAULT '1080p',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mosques table
CREATE TABLE IF NOT EXISTS mosques (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(50),
    website TEXT,
    amenities TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_journal_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_times_city_country ON prayer_times(city, country);
CREATE INDEX IF NOT EXISTS idx_donations_user_id ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

-- Insert sample admin user
INSERT INTO users (id, name, email, password, role) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Admin User', 'admin@tijaniyah.com', 'admin123', 'admin'),
('550e8400-e29b-41d4-a716-446655440001', 'Super Admin', 'superadmin@tijaniyah.com', 'superadmin123', 'super-admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample live stream
INSERT INTO live_streams (id, title, description, url, thumbnail_url, viewers, is_live) VALUES 
('550e8400-e29b-41d4-a716-446655440002', 'Madina Live Tv Online 24/7', 'Live broadcast from Madinah - 24/7 HD stream from the Prophet\'s Mosque', 'https://www.youtube.com/embed/TpT8b8JFZ6E?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1', 'https://img.youtube.com/vi/TpT8b8JFZ6E/maxresdefault.jpg', 98000, true)
ON CONFLICT (id) DO NOTHING;
