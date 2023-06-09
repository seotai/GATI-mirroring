package com.family.gati.entity;

import com.family.gati.dto.AlbumCommentDto;
import com.family.gati.util.CommonBuilder;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter @Setter
@Table(name = "ALBUM_COMMENT")
public class AlbumComment {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue
    private Integer id;

    @Column(name = "ALBUM_ID", nullable = false, length = 20)
    private Integer albumId;

    @Column(name = "USER_ID", nullable = false, length = 20)
    private String userId;

    @Column(name = "CONTENT", nullable = false, length = 1000)
    private String content;

    @Column(name = "CREATE_TIME", nullable = false)
    private Timestamp createTime;

    @Column(name = "UPDATE_TIME", nullable = false)
    private Timestamp updateTime;

    @Column(name = "NICKNAME", nullable = false, length = 20)
    private String nickname;

    public AlbumComment(BoardComment boardComment, Integer albumId) {
        this.albumId = albumId;
        this.userId = boardComment.getUserId();
        this.content = boardComment.getContent();
        this.createTime = boardComment.getCreateTime();
        this.updateTime = boardComment.getUpdateTime();
        this.nickname = boardComment.getNickname();
    }

    private AlbumComment(AlbumComment.AlbumCommentBuilder builder) {
        this.id = builder.id;
        this.albumId = builder.albumId;
        this.userId = builder.userId;
        this.content = builder.content;
        this.createTime = builder.createTime;
        this.updateTime = builder.updateTime;
        this.nickname = builder.nickname;
    }

    public static class AlbumCommentBuilder implements CommonBuilder<AlbumComment> {
        private Integer id;
        private Integer albumId;
        private String userId;
        private String content;
        private Timestamp createTime;
        private Timestamp updateTime;
        private String nickname;

        public AlbumCommentBuilder(AlbumCommentDto albumCommentDto) {
            this.id = albumCommentDto.getId();
            this.albumId = albumCommentDto.getAlbumId();
            this.userId = albumCommentDto.getUserId();
            this.content = albumCommentDto.getContent();
            this.createTime = albumCommentDto.getCreateTime();
            this.updateTime = albumCommentDto.getUpdateTime();
            this.nickname = albumCommentDto.getNickname();
        }

        public AlbumComment build() {
            return new AlbumComment(this);
        }
    }
}

