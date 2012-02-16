// This software is licensed under the MIT License, http://www.opensource.org/licenses/mit-license.php
// Copyright (c) 2012 High Integrity Design, LLC.    http://www.highintegritydesign.com
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
// and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions
// of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
// TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.
// *************************************************************************************************************
//
// convert the standard ExpressionEngine contact form to use AJAX.
$(document).ready(function() 
{
	/* helper function to display a message describing the results of the form submit */
	function displayAjaxMessage(message)
	{
		$("#ajax-message").html(message);
		$("#ajax-message").fadeIn(1000);
	}
	
	/* attach a submit handler to the contact form. By default, EE generates the ID "contact_form" */
	$("#contact_form").submit(function(event) 
	{
		/* stop the contact form from submitting normally */
		event.preventDefault(); 
		
		/* hide any left over message from a previous submit */
		$("#ajax-message").hide();
	
		/* send the form data using post and check the results for any errors*/	
		$.ajax(
		{
			url: "/",
			type: "post",
			dataType: "html",			
			data: $(this).serialize(),
			
			/* If there was some kind of an AJAX error, display an appropriate message or take some other action of your choice */
			error: function(jqXHR, textStatus, errorThrown)
			{
				displayAjaxMessage("Sorry, there was an error submitting your form. Please call me at 999-999-9999 and I'll be glad to assist you.");
			},
	
			/* 	parse the HTML returned by EE to see if they forgot to enter an email address or a message. 
				If so, the HTML will contain a specific error string we can match, and then we can display our own message */
			success: function(html, textStatus, jqXHR) 
			{
				if (html.match(/<title>Error<\/title>/)) 
				{
					var error = $(html).find('ul li:first').text();	
					if (error == "A valid sender email is required")
					{
						displayAjaxMessage("Please enter your email address.");
					}
					else if (error == "Email Message is Required")					
					{
						displayAjaxMessage("Please enter a message.");						
					}
				}
				else
				{
					displayAjaxMessage("Thanks for contacting me!");
				}
			}

		});
	});
});
