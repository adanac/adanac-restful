/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	
	config.filebrowserUploadUrl = basePath+'/ckUpload.file';
	
	config.image_previewText=' '; //预览区域显示内容
	
	config.toolbar = 'MyToolbar';//把默认工具栏改为‘MyToolbar’     
    
    config.toolbar_MyToolbar =     
    [     
        ['Source','-','NewPage','Preview','-','Templates'],     
		['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],     
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],     
		['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],     
		'/',     
		['BidiLtr', 'BidiRtl'],     
		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],     
		['NumberedList','BulletedList','-','Outdent','Indent','Blockquote','CreateDiv'],     
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],     
		['Link','Unlink','Anchor'],     
		'/',     
		['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],     
		['Styles','Format','Font','FontSize'],     
		['TextColor','BGColor'],     
		['Maximize', 'ShowBlocks','-','About']     
    ];
};
