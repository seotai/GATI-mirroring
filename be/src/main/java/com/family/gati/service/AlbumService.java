package com.family.gati.service;

import com.family.gati.dto.AlbumDto;
import java.util.List;

public interface AlbumService {
    List<AlbumDto> findByGroupId(Integer groupId, String userId);
    List<AlbumDto> findByGroupIdAndSearchCondition(Integer groupId, String userId, String search);
    AlbumDto insertAlbum(AlbumDto albumDto);
    AlbumDto findById(Integer id, String userId);
    AlbumDto updateAlbum(AlbumDto albumDto);
    void deleteAlbumById(Integer id);
    boolean findLikes(Integer albumId, String userId);
}
