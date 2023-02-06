package com.family.gati.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class PlanDto {
    private int id;
    private String userId;
    private String groupId;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String place;
    private String memo;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
