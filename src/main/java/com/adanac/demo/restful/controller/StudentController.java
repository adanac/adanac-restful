package com.adanac.demo.restful.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * @author adanac
 * @version 1.0
 */
@Controller
@RequestMapping("/student")
public class StudentController {

	/**
	 * student路径下默认显示用户列表
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView index() {
		ModelMap model = new ModelMap();
		return new ModelAndView("student/index", model);
	}

}
