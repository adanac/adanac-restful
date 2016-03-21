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
@RequestMapping("/upload")
public class UploadPicController {

	/**
	 * 跳转到上传图片页面
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView index() {
		ModelMap model = new ModelMap();
		return new ModelAndView("upload/uploadPic", model);
	}
}
