package com.family.gati.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
public class BoardCommentUpdateDto {
    @ApiModelProperty(example = "1")
    private Integer id;
    @ApiModelProperty(example = "댓글의 내용 입니다.")
    private String content;
}
