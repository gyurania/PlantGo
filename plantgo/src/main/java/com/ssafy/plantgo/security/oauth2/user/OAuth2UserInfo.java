package com.ssafy.plantgo.security.oauth2.user;

import java.util.Map;

// 추상 클래스를 각각의 서비스(Facebook, Google, Guthub 등)에 맞게 구현
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getImageUrl();
}