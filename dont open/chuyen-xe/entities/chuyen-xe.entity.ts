import { ApiProperty } from "@nestjs/swagger";
import { ChuyenXe } from "@prisma/client";

export class ChuyenXeEntity implements ChuyenXe{
    @ApiProperty()
    idChuyenXe: string;
    
    @ApiProperty()
    idTaiXe: string;

    @ApiProperty()
    idKhachHang: string;
    
    @ApiProperty({required: false})
    trangThai: string;
    
    @ApiProperty()
    diemDon: string;

    @ApiProperty()
    diemTra: string;

    @ApiProperty({required: false})
    giaTien: number;

    @ApiProperty({required: false, nullable: true})
    gioHen: Date | null;
}
