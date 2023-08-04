import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateChuyenXeDto {

    @IsString()
    @MinLength(1)
    @ApiProperty()
    idTaiXe: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    idKhachHang: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    @ApiProperty({required: false})
    trangThai: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    diemDon: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    diemTra: string;

    @IsOptional()
    @ApiProperty({required: false})
    giaTien: number;

    @IsString()
    @IsOptional()
    @IsOptional()
    @ApiProperty({required: false})
    gioHen: Date;
}


// model ChuyenXe {
//     idChuyenXe  String   @id @default(uuid())
//     idTaiXe     String
//     idKhachHang String
//     trangThai   String
//     diemDon     String
//     diemTra     String
//     giaTien     Float
//     gioHen      DateTime
//   }
  