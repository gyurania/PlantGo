package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.config.HDFSConfig;

import java.nio.file.FileSystem;

public class HDFSService {

    private static FileSystem filesystem;

    static {
        HDFSConfig config = new HDFSConfig();
        config.setHostname("cluster.ssafy.io");
        config.setPort("22");
        config.setUsername("j7a703");
    }
}
