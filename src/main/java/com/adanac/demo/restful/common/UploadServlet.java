package com.adanac.demo.restful.common;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.StringWriter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.bn.b2b.util.imageserver.PicUpUtil;

/**
 * 上传图片Servlet
 */
public class UploadServlet extends HttpServlet {
	private static final long serialVersionUID = 2334394978542718655L;

	private DiskFileItemFactory diskFileItemFactory;
	private String uploadPath;
	long sizeMax = 1024 * 1024 * 100;// 设置文件的大小为100M
	private ServletFileUpload servletFileUpload;
	private String configUpload;

	public void init(ServletConfig config) throws ServletException {
		uploadPath = config.getServletContext().getRealPath("/upload/");

		File uploadFilePath = new File(uploadPath);
		if (!uploadFilePath.exists()) {
			uploadFilePath.mkdirs();
		}

		diskFileItemFactory = new DiskFileItemFactory();
		diskFileItemFactory.setRepository(uploadFilePath);

		int sizeThreshold = 1024 * 10; // 缓存区大小
		diskFileItemFactory.setSizeThreshold(sizeThreshold);

		servletFileUpload = new ServletFileUpload(diskFileItemFactory);
		servletFileUpload.setSizeMax(sizeMax);

		InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("conf/file.json");

		Reader reader = new InputStreamReader(in);
		StringWriter out = new StringWriter();

		char[] buffer = new char[1024];

		int total;

		try {
			while ((total = reader.read(buffer)) > 0) {

				out.write(buffer, 0, total);
			}

			out.flush();

			configUpload = out.toString();

			Pattern p = Pattern.compile("\\s*|\t|\r|\n");
			Matcher m = p.matcher(configUpload);
			configUpload = m.replaceAll("");

		} catch (IOException e) {
		} finally {
			try {
				out.close();
				reader.close();
			} catch (IOException e) {
			}
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setHeader("Content-Type", "text/html");
		response.getWriter().write(configUpload);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			List<FileItem> fileItems = servletFileUpload.parseRequest(request);

			for (FileItem fileItem : fileItems) {
				PrintWriter out = response.getWriter();
				String result = null;

				String filePath = fileItem.getName();

				if (filePath == null || filePath.trim().length() == 0)
					continue;
				String fileName = filePath.substring(filePath.lastIndexOf(File.separator) + 1);
				String extName = filePath.substring(filePath.lastIndexOf(".") + 1);

				try {
					// fileItem.write(new File(uploadPath + File.separator +
					// fileName));

					String downloadUrl = doUpload(fileName, extName, fileItem);

					result = "{\"state\": \"SUCCESS\",\"title\": \"" + filePath + "\",\"original\": \"" + filePath
							+ "\",\"type\": \"." + extName + "\",\"url\": \"" + downloadUrl + "\",\"size\": \""
							+ fileItem.getSize() + "\"}";

					out.write(result);
					out.flush();

				} catch (Exception e) {

					result = "{\"state\": \"ERROR\",\"errorMsg\":\"" + e.getMessage() + "\"}";

					out.write(result);
					out.flush();

				}
			}

		} catch (FileUploadException e) {

		} catch (IOException e1) {

		}
	}

	private String doUpload(String fileName, String extName, FileItem fileItem) throws IOException {
		InputStream fileInput = fileItem.getInputStream();
		StringBuilder filePath = new StringBuilder();

		String uploadresult = PicUpUtil.getPicUrl(toByte(fileInput), extName);

		filePath.append("http://");
		filePath.append(PicUpUtil.getPicIp());
		filePath.append(":");
		filePath.append(PicUpUtil.getPicPort());
		filePath.append("/");
		filePath.append(uploadresult);
		return filePath.toString();

	}

	public static final byte[] toByte(InputStream in) throws IOException {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int readTotal = 0;
		while ((readTotal = in.read(buffer, 0, 1024)) > 0) {
			out.write(buffer, 0, readTotal);
		}
		byte[] result = out.toByteArray();
		return result;
	}

}
