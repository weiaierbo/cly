package com.xk.love.cly;

import com.xk.love.cly.entity.User;
import org.junit.jupiter.api.Test;
import org.openjdk.jol.info.ClassLayout;
import org.openjdk.jol.vm.VM;

/**
 * @author xk
 * @create 2020-06-04 9:04
 */
public class TestJOL {

    @Test
    public void test1(){
        System.out.println("你好");
        //Object obj = new Object();
        User obj = new User();
        System.out.println(ClassLayout.parseInstance(obj).toPrintable());

        Byte s = 1;
        System.out.println(s.intValue());
        System.out.println(VM.current().details());
        System.out.println(ClassLayout.parseInstance(s).toPrintable());
    }
    @Test
    public void test2(){
        System.out.println("今天登不上github");
    }
}
