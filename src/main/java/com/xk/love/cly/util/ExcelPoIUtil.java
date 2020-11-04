package com.xk.love.cly.util;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @desc excel工具
 * @date 2020.04.27
 */
public class ExcelPoIUtil {

    public static void main(String[] args){
        /*String defProfitCenter = "1234";
        String s = "{profitCenter}".toLowerCase().replaceAll("\\{profitcenter\\}", defProfitCenter);
        System.out.println(s);*/
        poiExcel("C:\\Users\\xk\\Desktop\\2.xlsx");

    }

    public static void poiExcel(String fileName){
        boolean is2007 = true;    //判断是否是excel2007格式
        if(fileName.endsWith("xlsx"))
            is2007 = false;
        try {
            InputStream input = new FileInputStream(fileName);  //建立输入流
            Workbook wb  = null;
            //根据文件格式(2003或者2007)来初始化
            if(is2007)
                wb = new HSSFWorkbook(input);
            else
                wb = new XSSFWorkbook(input);
            Sheet sheet = wb.getSheet("财务凭证调整数据");
            int lastRowNum = sheet.getLastRowNum();
            for (int i = 1; i <= lastRowNum; i++) {
                System.out.println("第"+i+"行----------");
                //具体到某一行
                Row row = sheet.getRow(i);
                //单元格的数量
                /*int lastCellNum = row.getLastCellNum();
                for (int j = 0; j < lastCellNum; j++) {
                    StringBuilder result= new StringBuilder();
                    Cell cell = row.getCell(j);
                    Object content = getCellValue(cell);
                    System.out.println(content);

                }*/
                Integer month = Double.valueOf((double)getCellValue(row.getCell(1))).intValue();
                String companyCode = (String) getCellValue(row.getCell(2));
                String voucherType = (String) getCellValue(row.getCell(3));
                Date voucherDate = (Date) getCellValue(row.getCell(4));
                Date postDate = (Date) getCellValue(row.getCell(5));
                String headerText = (String) getCellValue(row.getCell(6));
                String flag = (String) getCellValue(row.getCell(7));

                //String subjectCode = getCellValue(row.getCell(8))+"";//String.valueOf(((Double)getCellValue(row.getCell(8))).intValue());

                DecimalFormat df = new DecimalFormat("0");
                String subjectCode = df.format(getCellValue(row.getCell(8)));

                String profitCenter = (String) getCellValue(row.getCell(9));
                String costCenter = (String) getCellValue(row.getCell(10));
                BigDecimal bigDecimal = new BigDecimal(String.valueOf(getCellValue(row.getCell(11))));
                //String amount =String.valueOf(getCellValue(row.getCell(11))).replace("-","");
                String amount = bigDecimal.setScale(2, BigDecimal.ROUND_HALF_UP).abs().toString();
                String lineText = (String) getCellValue(row.getCell(12));
                System.out.println(month+" "+companyCode+" "+voucherType+" "+voucherDate+" "+
                        postDate+" "+headerText+" "+flag+" "+subjectCode+" "+profitCenter+" "
                    +costCenter+" "+amount+" "+lineText);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public static Object getCellValue(Cell cell){
        Object content = null;
        if(cell == null) {
            return null;
        }
        //根据cell中的类型来输出数据
        switch (cell.getCellType()) {
            case NUMERIC:
                content = cell.getNumericCellValue();
//                        // 判断单元格是否属于日期格式
//                        if(HSSFDateUtil.isCellDateFormatted(cell)){
//                            //java.util.Date类型
//                            result = cell.getDateCellValue();
//                        }
                short format = cell.getCellStyle().getDataFormat();
                SimpleDateFormat sdf = null;
                if(format != 0){
//                            format == 177时是当指定单元格格式为日期是都是177
                    if(format == 14 || format == 31 || format == 57 || format == 58||format == 177){
                        //日期
                        //sdf = new SimpleDateFormat("yyyy-MM-dd");
                        double value = cell.getNumericCellValue();
                        content = DateUtil.getJavaDate(value);
                        //content = sdf.format(date);
                    }
                }
                //System.out.println(content);
                break;
            case STRING:
                content = cell.getStringCellValue();
                break;
            case BOOLEAN:
                content = cell.getBooleanCellValue();
                break;
            case FORMULA:
                content = cell.getCellFormula();
                break;
            case BLANK:
                // System.out.println("为空");
                break;
            default:
                //System.out.println("unsuported sell type");
                break;
        }
        return content;
    }

}
