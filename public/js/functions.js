

var url = 'http://'+window.location.host+'/whobu/test/public/';
console.log("loading the function file");

function checkall()
{
// var namehtml=document.getElementById("name_status").innerHTML;
 var emailhtml=document.getElementById("email_status").innerHTML;

 if((emailhtml)=="Go ahaed! Email ID is Unique.")
 {
  return true;
 }
 else
 {
  return false;
 }
}

function checkemail(){
			 var email=document.getElementById( "email" ).value;
				
			 if(email)
			 {
			  $.ajax({
			  type: 'post',
			  url: '/checkemail',
			  data: {
			   user_email:email,
			  },
			  success: function (response) {
			//   $( '#email_status' ).html(response);
			   if(response=="OK")	
			   {
				 $( '#email_status' ).html("Go ahaed! Email ID is Unique.");
				return true;	
			   }
			   else
			   {
				 $( '#email_status' ).html(response);
				return false;	
			   }
			  }
			  });
			 }
			 else
			 {
			  $( '#email_status' ).html("");
			  return false;
			 }
}


$(document).ready(function(){	

$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});


	$('#tabs').tab();
	var shippingDetails 	= $('#shipping_information_details');
	var productQuantity 	= $('#product_quantity');
	var checkoutUserEmail 	= $('#checkout-user-email');
	var checkoutStep1		= $('#step1');
	var checkoutStep2 		= $('#step2');
	var checkoutStep3		= $('#step3');
	var checkoutStep4 		= $('#step4');
	var url 				= 'http://'+window.location.host+'/whobu/test/public';
	$(".chageVariants").change(function(){
			var dataString = 'getVariantCombination/'+$(this).val()+'/'+$(this).data('variant'); 
			var attributeNumber = $(this).data('variant');  
			$.ajax({
				type: "POST",
				url: url+dataString,
				contentType: "application/json; charset=utf-8",
				dataType: "html",
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					
				},
				success:function(result) {
					
					if(attributeNumber == 1) {
						
					   $("#divattribute_"+2).html(result);
					}
					if(attributeNumber == 2) {
						
					   $("#divattribute_"+1).html(result);
					}
				},
			});
	});
	
  
	$(".addtocart").unbind().click(function(){
		var pid = $(this).data('pid');
        $('#fromWishlist').val($(this).data('wishlistid'));
		var dataString = 'productDetailsInfo/'+pid; 
			$.ajax({
				type: "POST",
				url: url+dataString,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//alert(error);
				},
				success:function(result) {
					 $("#prodid").html(result);
					 $('#Addtocart').modal("show");
				},
			})
    });
    
    $(".close").click(function(){
		$('#Addtocart').css('display','none');
	});	
		
	$(".close").click(function(){
		$('#quick-cart').css('display','none');
	});	
		
		
	
	$(".atcfpd").click(function(){	
	
	console.log("clicked add to carts");
		var qty = productQuantity.val();
		var abc = $(this).data('attr');
        var fromWishlist = $('#fromWishlist').val();
	    
		if($('#attribute_1').length > 0 && $('#attribute_1').val()=="") {
				$('#error_attribute_1').html("Please Select Attribute "+$('#attribute_1').data('attrval')+".");
				return false;
		}
		else if($('#attribute_2').length > 0 && $('#attribute_2').val()=="") {
				$('#error_attribute_2').text("Please Select Attribute "+$('#attribute_2').data('attrval')+".");return false;
		}
		else if($('#attribute_3').length > 0 && $('#attribute_3').val()=="") {
				$('#error_attribute_3').text("Please Select Attribute "+$('#attribute_3').data('attrval')+".");return false;
		}
		if (qty == "" || qty < 1) {
			productQuantity.focus();
			$('#error_product_quantity').text("Please enter quantity.");
			return false;
		} 
		else {
			
			$('#error_attribute_1').html("");
			$('#error_attribute_2').html("");
		    $('#error_attribute_3').html("");
			var attr1='n',attr2='n',attr3='n';
			
			if($('#attribute_1').length > 0 && $('#attribute_1').val()!="")
				var attr1 = $('#attribute_1').val();
			if($('#attribute_2').length > 0 && $('#attribute_2').val()!="")
				var attr2 = $('#attribute_2').val();
			if($('#attribute_3').length > 0 && $('#attribute_3').val()!="")
				var attr3 = $('#attribute_3').val();
		    var pID = $('#product_id').val(); 
		   // var pid = $('#addtocart').data('pid');
			var dataString = 'checkInventory/'+pID+'/'+attr1+'/'+attr2+'/'+attr3;
			//var dataString = 'test/'+pid;
			$.ajax({
				type: "POST",
				url: url+dataString,
				contentType: "application/json; charset=utf-8",
				dataType: "html",
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					
				},
				success:function(result) {
					if(result < parseInt(qty) ) {
						productQuantity.focus();
						productQuantity.val('');
						$('#error_product_quantity').text(qty +" products not in stock");
					}					
					else {	
						//$("#addToCart").submit();
					var dataString = 'addToCart';
					
					//window.location = url+dataString;
					   $.ajax({
						   type: "POST",
						   data: $("#addToCart").serialize(),
						   url: "/addToCart", // the URL of the controller action method
						   error: function(XMLHttpRequest, textStatus, errorThrown) {
							alert(errorThrown);
							},
						   success: function(result) { 
							  if(result == "QtyError") {
									$('#error_product_quantity').text(qty +" products not in stock");
								} else {
									var res = result.substring(0, result.indexOf('###'));
									var cnt=  result.substring(result.indexOf('###')+3,result.indexOf('@@@'));
									$('#cartItemCnt').html(cnt);
									$('#cartDel').html(res);
									if(abc == "buynow") {
										$('#Addtocart').modal("hide");
										$('#quick-cart').modal("show");
									} else {
										if(fromWishlist != "") {
                                            $("#prodid").html("Product Moved To cart");
                                            $('#Addtocart').modal("show");
                                            setTimeout(function() { 
                                                $('#Addtocart').modal("hide").fadeOut(1500); }, 5000)
                                            var dataString = 'deleteWlistProduct/'+fromWishlist;
                                            $.post( url+dataString, {
                                            },function (response) {
                                                    window.location = "/dashboard/wishlist";
                                                    $("#ErrorWishlist").show();
                                                    $("#ErrorWishlist").show().delay(60000).hide(0);
                                            });
                                        } else {
                                            $("#prodid").html("Product Added To cart");
                                            $('#Addtocart').modal("show");
                                            setTimeout(function() { 
                                                $('#Addtocart').modal("hide").fadeOut(1500); }, 5000)
                                        }
									}
							   }
						   },
						});
					}
				},
			});
		}
	});

	$(".addToWishlist").click(function() {
		var pid = $(this).data('pid');
		var dataString 	= 'addToWishlist/'+pid;
		
		$.ajax({
			type: "POST",
			url: url+dataString,
			contentType: "application/json; charset=utf-8",
			dataType: "html",
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//alert('Error');
				$('#message').text("Sorry, failed to add product in wishlist");
			},
			success:function(result) {
                    $("#prodid").html("Product Added To wishlist");
                    $('#Addtocart').modal("show");
                    setTimeout(function() { $('#Addtocart').modal("hide").fadeOut(1500); }, 5000)
            }
		});
	});

	$(".btn-continue-guest").click(function(){
		var email = checkoutUserEmail.val();
		if (email == "") {
			checkoutUserEmail.focus();
			//alert('Please enter email address');
			$('#ErrorMsg').text('Please enter email address');
			return false;
		} else {
			
			if (validateEmail(email)) {
				$('#ErrorMsg').text('');
				$('#user_email').val(email);
				$('#collapseOne').collapse('hide');
				$('#collapseTwo').collapse('show');
				$('#collapseTwo').css('display','block');
			} else { 
				checkoutUserEmail.focus();
				//alert('Please enter valid email address');
				$('#ErrorMsg').text('Please enter valid email address');
				return false;
			}
		}
	});

	$(".update_qty_image").click(function(){
		
	});	
	
	$("#createAccountRadio").click(function(){
		$('#registrationForm').show();
	});
	$("#checkoutGuestRadio").click(function(){
		$('#registrationForm').hide();
	});
	$("#same_billing_info").change(function(){
		
		if (this.checked) {
			//$('#shippingDetails').css('display','none');
			//shippingDetails.hide();
			$("shippingDetails").addClass('has-error');
			var fname     = $('#billing_first_name').val();
			//var lname     = $('#billing_last_name').val();
			var bemail    = $('#billing_email').val();
			var telephone = $('#billing_telephone').val();
			var addr1     = $('#billing_address_1').val();
			var addr2     = $('#billing_address_2').val();
			var city      = $('#billing_city').val();
			var zip       = $('#billing_zip').val();
			//var state     = $('#billing_state').val();
			var country   = $('#billing_country').val();
			
			$('#shipping_first_name').val(fname);
			//$('#shipping_last_name').val(lname);
			$('#shipping_email').val(bemail);
			$('#shipping_telephone').val(telephone);
			$('#shipping_address_1').val(addr1);
			$('#shipping_address_2').val(addr2);
			$('#shipping_city').val(city);
			$('#shipping_zip').val(zip);
			//$('#shipping_state').val(state);
			$('#shipping_country').val(country);
			//$('#product_information').css('margin-top','55px');
			$('#shippingDetails').css('display','none');
			
		} else {
			$('#shippingDetails').css('display','none');
			//shippingDetails.show();
			//$('#product_information').css('margin-top','20px');
		}
		
	});
	$("#diff_billing_info").change(function(){
		if (this.checked) {
			$('#shippingDetails').css('display','block');
			$('#shipping_first_name').val('');
			$('#shipping_email').val('');
			$('#shipping_telephone').val('');
			$('#shipping_address_1').val('');
			$('#shipping_address_2').val('');
			$('#shipping_city').val('');
			$('#shipping_zip').val('');
			$('#shipping_country').val('');
		}
	
	});
	$('form#creditCardInfo').validate({
		rules: {
			cc_name_on_card: {required: true},
			cc_expiration: {required: true},
			cc_card_number: {required: true},
			cc_varification_number: {required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
	});
	

	   	
	$('form#ca-register').validate({

	
		rules: {
			firstName: {required: true},
			lastName: {required: true},
			
			 email: {required: true,email: true}, 
/*
			email: {required: true,email: true,
					remote:
                    {
                      url: '/caRegister',
                      type: "post",
                      data: 
						  {
							  email: function()
							  {
								return $('form#ca-register input[type="email"]').val(); 
							  }
						  },
                      success:function(data) {

						  if(data.msg != "yes") {
							  $('#signuperror').show();
							  console.log("inside the error code");
							  console.log(data.msg);
							 // e.preventDefault();

							  return true;
					
							  
						  }	else {
							  $('#signuperror').hide();
							  console.log("inside the sucesss code");
							  $("#ca-register").attr("id", "ca-register-new");
							//  e.preventDefault();
							  
								return true;
				
						  }

					  }
				
                    error: function(xhr, status, error) {
							 alert(xhr.responseText);
							if(xhr.responseText != "")
							{
								$('#signuperror').show();
							}
							else
							{
								$('#signuperror').hide();
							}
							
							  return false;
							
						}   
                                      					
                    },

			}, */
			
			
			password: {minlength: 6, required: true},		
			messages: {				
				email: {
				  remote: "Your email address must be in the format of name@domain.com"
				}
			},
			
			
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());

            } else {
                error.insertAfter(element);
	
            }
        },
	
	
	});
	
	
	
   
	
	
	$('form#checkout-new-user-reg').validate({
		rules: {
			registerFirstName: {required: true},
			registerLastName: {required: true},
			registerEmail: {required: true,email: true},
			registerPassword: {minlength: 6, required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
		
	});
	
	$('form#checkout-login').validate({
		rules: {
			loginUserName: {required: true, email: true},
			loginPassword: {required: true},
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
		
	});
	
	$('form#ca-login').validate({
		rules: {
			emailAddress: {required: true, email: true},
			password: {required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
		
	});
	$('form#contactform').validate({
		rules: {
			Inquiry: {required: true},
			Name : {required: true},
			Email: {required: true, email: true},
			PhoneNo: {required: true},
			OrderNo: {required: true},
			Message: {required: true}
		},
        highlight: function(element) {
            $(element).closest('.ca_registration').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.ca_registration').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
		    if(element.parent('.select-group').length) {
                error.insertAfter(element.parent());
            }
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
		
	});

$('form#dashboardprofile').validate({
		rules: {
			fname: {required: true},
			lname: {required: true},
			mobile: {required: true},
			dob: {required: true},
			gender: {required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
	});
	
	$('form#changePwd').validate({
		rules: {
			oldpwd: {required: true},
			newpwd: {required: true},
			confpwd: {required: true, equalTo:'#newpwd'},
		},
		messages: {
			confpwd :"This field is required and Confirm Password Same as New Password"
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
	});
	
	$('form#dashboardaddresses').validate({
		rules: {
			fname: {required: true},
			lname: {required: true},
			addr1: {required: true},
			addr2: {required: true},
			city: {required: true},
			state: {required: true},
			country: {required: true},
			zip: {required: true},
			sfname: {required: true},
			slname: {required: true},
			saddr1: {required: true},
			saddr2: {required: true},
			scity: {required: true},
			sstate: {required: true},
			scountry: {required: true},
			szip: {required: true}
			
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
	});

	$('form#reviewForm').validate({
		rules: {
			star1: {required: true},
			comment: {required: true},
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
	});

	$('form#loginForm').validate({
		rules: {
			emailAddress: {required: true, email: true},
			password: {required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }, 
	});
	
		$("#loginsubmit").click(function(){
			var dataString = 'chklogindetails/'+$("#emailAddress").val()+'/'+$("#password").val();
			
			if($("#emailAddress").val() == "") {
				$("#span_email").html("This field is required");
				return false;
			}else {
				if(!validateEmail($("#emailAddress").val())) {
					$('#span_email').html('Please enter valid email address');
					return false;
				}
		    }
			if($("#password").val() == "") {
				$("#span_password").html("This field is required");
				return false;
			}
			if($("#routedashboard").val() == "wishlist_pd") {
				$.ajax({
					type: "POST",
					url: url+dataString,
					error: function(XMLHttpRequest, textStatus, errorThrown) {
					},
					success:function(result) {
						if(result == 0) {
							$('#loginerror').css('display','block');
							$('#span_email').html('');
						}else {
							pid = $("#proid").val();
							var dataString 	= 'addToWishlist/'+pid;
							$.ajax({
								type: "POST",
								url: url+dataString,
								contentType: "application/json; charset=utf-8",
								dataType: "html",
								error: function(XMLHttpRequest, textStatus, errorThrown) {
									//alert('Error');
									$('#message').text("Sorry, failed to add product in wishlist");
								},
								success:function(result) {
									$('#logion-model').modal("hide");
									$("#prodid").html("Product Added To wishlist");
									$('#Addtocart').modal("show");
									setTimeout(function() { $('#Addtocart').modal("hide").fadeOut(1500); }, 5000)
									location.reload();
								}
							});
							//return Redirect::to('/dashboard/wishlist');
						}
					},
				});
			} else {
				$.ajax({
					type: "POST",
					url: url+dataString,
					error: function(XMLHttpRequest, textStatus, errorThrown) {
					},
					success:function(result) {
						if(result == 0) {
							$('#loginerror').css('display','block');
							$('#span_email').html('');
						}else {
							$('form#loginForm').submit();
						}
					},
				});
			}
		});
		
 
	$('form#checkout-page-info').validate({
        rules: {
            billing_first_name: {
                required: true
            },
            billing_last_name: {
                required: true
            },
            billing_email: {
				required: true,
				email: true
			},
			billing_telephone: {
				required: true
			},
			billing_address_1: {
				required: true
			},
			billing_address_2: {
				required: false
			},
			billing_city: {
				required: true
			},
			billing_zip: {
				required: true
			},
			billing_state: {
				required: true
			},
			billing_country: {
				required: true
			},			
			shipping_first_name: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_last_name: {
                required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
            },
            shipping_email: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				},
				email: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_telephone: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_address_1: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
		
			shipping_address_2: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return false;
					}
				}
			},
			
			
			shipping_city: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_zip: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_state: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_country: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
						
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    
    $('.newArrivalSorting').click(function () {
		$("#sortByNewArrival").submit();
	});	
    
    $(".addDist").change(function(){
        $("#div_invalid").html("");
        $('#cupnDist').css('display','none');
        $('#grandtot').html($('#subtot').html());
        $('#cupnGrandTotal').html($('#subtot').html());
	});

    $('.applyCouponCode').click(function(){
	cpCode = $('#couponcode').val();
	if($('#couponcode').val() == "") cpCode = "n";
	var dataString = 'chkvalidcoupon/'+cpCode;
	cart = $('.addDist').data('val');
	
	$.post( url+dataString, {
		
	}, function (response) {
		
		if(response == "error") {
			$("#div_invalid").html("Please Enter Valid Coupon Code");
		}
		else {
			discount = response;
			$.post( url+'addDist/'+discount+'/'+cart, {
				
			}, function (response) {
				$('p').show();
                $("#div_invalid").html("");
				var json = JSON.parse(response);                
				$('#couponDist').html(" Rs."+json.discount);
				$('#grandtot').html(" Rs."+json.amount);
                $('.distotal').html(" Rs."+json.amount);
                $('.disgrandtot').html(" Rs."+json.amount);
                
			});
		}
		
		});
	});
	
});

function editProductQty(cpID,cID) {
	
	$('#update_'+cID+'_'+cpID).show();
	$('#default_'+cID+'_'+cpID).hide();
	
	$('#update_icon_'+cID+'_'+cpID).css({'float': 'left','margin-right': '5px'});
	$('#update_icon_'+cID+'_'+cpID).show();
	$('#edit_icon_'+cID+'_'+cpID).hide();	
	
}

function updateProductQty(cpID,cID,route) {
	
	var qtyToUpdate = $('#qty_'+cID+'_'+cpID).val();
	
	var couponCode = "n";
	if($("#couponcode").length > 0 && $("#couponcode").val() !="") {
		var couponCode = $("#couponcode").val();
	}
	if (qtyToUpdate > 0) {	
		var attr1 = $('#qty_'+cID+'_'+cpID).data('attr1');
		var attr2 = $('#qty_'+cID+'_'+cpID).data('attr2');
		var attr3 = $('#qty_'+cID+'_'+cpID).data('attr3');
		var dataString = 'updateCartProduct/'+cpID+'/'+cID+'/'+qtyToUpdate+'/'+attr1+'/'+attr2+'/'+attr3+'/'+route+'/'+couponCode;
		//window.location = url+dataString;
		$.post( url+dataString, {
			
		}, function (response) {
			if(response == 0) {
				$('#qtyerror_'+cID+'_'+cpID).text(qtyToUpdate +" Products are not in stock");
			}
			else {
				var res = response.substring(0, response.indexOf('###'));
				$('#cartDel').html(res);
			}
		});
	} else {
		$('#qtyerror_'+cID+'_'+cpID).text('Please enter valid quantity');
		return false;
	}
}

function validateEmail(email) {
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return expr.test(email);
}


function emptyCart(CartID) {
	
	var dataString = 'deleteCart/'+CartID;

	$.post( url+dataString, {
		
	}, function (response) {
		window.location = "/cart";
	});
}

function deleteCartProduct(CartItemID,CartID,route) {
	var couponCode = "n";
	
	if($("#couponcode").length > 0 && $("#couponcode").val() !="") {
		var couponCode = $("#couponcode").val();
	}
	var dataString = 'deleteCartProduct/'+CartItemID+'/'+CartID+'/'+route+'/'+couponCode;
	if(confirm("Are u sure u want to delete")) {
		$.post( url+dataString, {

		}, function (response) {
			//alert(response.indexOf('###'));
				var res = response.substring(0, response.indexOf('###'));
				var cnt=  response.substring(response.indexOf('###')+3,response.indexOf('@@@'));
				$('#cartItemCnt').html(cnt);
				$('#cartDel').html(res);
		});
	} else {
	   return false;
	}		
}

function addToWish(productID,CartID,CartItemID) {
    var dataString 	= 'addToWishlist/'+productID;
    
    $.ajax({
        type: "POST",
        url: url+dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#message').text("Sorry, failed to add product in wishlist");
        },
        success:function(result) {
            var route = "cart";
            var couponCode = "n";
            if($("#couponcode").length > 0 && $("#couponcode").val() !="") {
                var couponCode = $("#couponcode").val();
            }
            var dataString = 'deleteCartProduct/'+CartItemID+'/'+CartID+'/'+route+'/'+couponCode;
                $.post( url+dataString, {

                }, function (response) {
                    var res = response.substring(0, response.indexOf('###'));
                    var cnt=  response.substring(response.indexOf('###')+3,response.indexOf('@@@'));
                    $('#cartItemCnt').html(cnt);
                    $('#cartDel').html(res);
                });
        }
    });
}

function changeC(id) {
	$('#'+id).css('background','#ffcc33');
}

function changeD(id) {
	$('#'+id).css('background','#00405d');
}

function removeFromWlist(wsID) {
	var dataString = 'deleteWlistProduct/'+wsID;
	if(confirm("Are u sure u want to delete")) {
	$.post( url+dataString, {
	},function (response) {
			window.location = "/dashboard/wishlist";
			$("#ErrorWishlist").show();
			$("#ErrorWishlist").show().delay(60000).hide(0);
	});
    } else {
	   return false;
	}
}

var clicked = 1;
$('#show_more').click(function() {
	alert('hi');
    
});

function searchProduct() {
	var searchname   = $('#search').val();
	if(searchname == '') {
		window.location = url+'searchProduct';
	} else if(searchname == '?') {
		return false;
	}
	var dataString = 'searchProduct/'+searchname;
	window.location = url+dataString;
}

var cnt=0;

$('#loadmore').unbind().click(function() {
	var from = $('#end').val();
	var max = $('#endLimit').val();
	
	if($('#sortby').length > 0 && $('#sortby').val() != '') {
		var sortorder = $('#sortby').val();
	} else {
		var sortorder = "emptysort";
	}
	if($('#cat').length > 0 && $('#cat').val() != '') {
		var catname = $('#cat').val();
		if($('#subcat').length > 0 && $('#subcat').val() != '') {
			var subcatname = $('#subcat').val();
			if($('#cosubcat').length > 0 && $('#cosubcat').val() != '') {
				var cosubcatname = $('#cosubcat').val();
			} else {
				var	cosubcatname = "cosubempty";
			}
		} else {
			var	subcatname = "empty";
			var	cosubcatname = "cosubempty";
		}
		var url1 = url + 'showmoreproducts/'+catname+'/'+subcatname+'/'+cosubcatname+'/'+from+'/'+sortorder;
	} else if($('#searchString').length > 0 && $('#searchString').val() != '') {
		var search = $('#searchString').val();
		var url1 = url + 'searchmoreproducts/'+search+'/'+from+'/'+sortorder;
	} else if($('#loc').length > 0 && $('#loc').val() != '') {
		var locate = $('#loc').val();
		var url1 = url + 'moreproducts/'+locate+'/'+from;
	} else {
		var url1 = url + 'recentmoreproducts/'+from;
	}
	//window.location = url1;
    $.ajax({
        type:'GET',
        url: url1,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
		},
		beforeSend: function () {
            $('#loadimg').html('<img src="/images/ajax_loading.gif">');
        },
        success: function(res) {
			console.log(res);
			loaded = parseInt(from) + 8;
			$('#end').val(parseInt(loaded));
			$('#loadimg').html('');
			$("#showDiv").append(res);
			if(loaded >= max ) {
				$('#loadmore').css('display','none');
			}
		},
    });
});

$('#loadmorenew').unbind().click(function() {
	var from = $('#end1').val();
	var max = $('#endLimit1').val();
	var locate = $('#loc1').val();
	var url = 'http://'+window.location.host+'/whobu/test/public/';
	var url1 = url + 'moreproducts/'+locate+'/'+from;
	alert(url1);
	//window.location = url1;
    $.ajax({
        type:'GET',
        url: url1,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
		},
		beforeSend: function () {
            $('#loadimg1').html('<img src="/images/ajax_loading.gif">');
        },
        success: function(res) {
			loaded = parseInt(from) + 8;
			$('#end1').val(parseInt(loaded));
			$('#loadimg1').html('');
			$("#newDiv").append(res);
			if(loaded >= max ) {
				$('#loadmorenew').css('display','none');
			}
		},
    });
});

$('#loadmoreevent').unbind().click(function() {
	var from = $('#end2').val();
	var max = $('#endLimit2').val();
	var locate = $('#loc2').val();
	var url1 = url + 'moreproducts/'+locate+'/'+from;
	//window.location = url1;
    $.ajax({
        type:'GET',
        url: url1,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
					    alert(errorThrown);
		},
        success: function(res) {
			loaded = parseInt(from) + 8;
			$('#end2').val(parseInt(loaded));
			$("#eventDiv").append(res);
			if(loaded >= max ) {
				$('#loadmoreevent').css('display','none');
			}
		},
    });
});

$('#register-submit').click(function() {
	var email = $('#forgotEmail').val();
	if (email == "") {
		$('#ErrorMsg').text('Please Enter Email Address');
		return false;
	} else {
		if (validateEmail(email)) {
		} else {
			$('#ErrorMsg').text('Please Enter Valid Email Address');
			return false;
		}
	}
});

$('#viewedProductId').click(function() {
	$('#viewedProductId').addClass('active');
	$('#featuredProductId').removeClass('active');
	$('#newProductId').removeClass('active');
});

$('#newProductId').click(function() {
	$('#newProductId').addClass('active');
	$('#featuredProductId').removeClass('active');
	$('#viewedProductId').removeClass('active');
});

$('#featuredProductId').click(function() {
	$('#featuredProductId').addClass('active');
	$('#newProductId').removeClass('active');
	$('#viewedProductId').removeClass('active');
});

$('#emailAddress').change(function() {
	$("#span_email").html('');
	$("#span_password").html('');
	$('#loginerror').css('display','none');
});

$('#password').change(function() {
	$("#span_email").html('');
	$("#span_password").html('');
	$('#loginerror').css('display','none');
});

$("#oldpwd").change(function(){
userid=$("#userid").val();
var dataString = 'checkpwd/'+$(this).val()+'/'+userid;
	$.post(url +dataString, {
	}, function(response) {
		 
		if(response == 0)
		{
			$("#oldPwd").val("");
			$("#diverror").html("Please Enter Correct Old Password");
		} else {
			$("#diverror").html('');
		}
	});
});

$('#selleragree').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});

$('#aboutusatt').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});


$('#privacypolicyatt').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});


$('#termsatt').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});


$('#returnpolicyatt').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});

$('#shippinginfoatt').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});

$('#orderreturnatt').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});

$('#contactusatt').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});

$('#sitemapatt').click(function() {
	var route = $(this).data('attr');
	var dataString = 'footerdetails/'+route;
	window.location = url+ dataString;
});

function newuserlogin() {
    var fname = $('#registerFirstName').val();
    var lname = $('#registerLastName').val();
    var email = $('#registerEmail').val();
    var pwd = $('#registerPassword').val();
	if (fname == "") {
		$('#registerFirstName').focus();
		$('#regError2').text('');
		$('#regError3').text('');
		$('#regError4').text('');
		$('#regError5').text('');
		$('#regError1').text('This field is required.');
		return false;
	}
	if (lname == "") {
		$('#registerLastName').focus();
		$('#regError1').text('');
		$('#regError3').text('');
		$('#regError4').text('');
		$('#regError5').text('');
		$('#regError2').text('This field is required.');
		return false;
	}
	if (email == "") {
		$('#registerEmail').focus();
		$('#regError1').text('');
		$('#regError2').text('');
		$('#regError4').text('');
		$('#regError5').text('');
		$('#regError3').text('This field is required.');
		return false;
	} else if (!validateEmail(email)) {
				$('#registerEmail').focus();
				$('#regError1').text('');
				$('#regError2').text('');
				$('#regError3').text('');
				$('#regError4').text('');
				$('#regError5').text('Please enter valid email address');
				return false;
			}
	if (pwd == "") {
		$('#registerPassword').focus();
		$('#regError1').text('');
		$('#regError2').text('');
		$('#regError3').text('');
		$('#regError5').text('');
		$('#regError4').text('This field is required.');
		return false;
	}
	$('#checkout-new-user-reg').submit();
}