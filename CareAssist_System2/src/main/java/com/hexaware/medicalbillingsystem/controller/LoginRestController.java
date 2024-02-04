package com.hexaware.medicalbillingsystem.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.medicalbillingsystem.dto.AuthRequest;
import com.hexaware.medicalbillingsystem.service.AuthJWTService;
import com.hexaware.medicalbillingsystem.service.IAdminMedicalService;

@CrossOrigin(origins="http://localhost:62063")
@RestController
@RequestMapping("/api/v1/login")
public class LoginRestController {
	
	

	Logger logger=LoggerFactory.getLogger(LoginRestController.class);
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	private AuthJWTService jwtService;
	
	@Autowired
	private IAdminMedicalService adminService;
	
	@PostMapping("/authenticate")
	public String authenticateAndGenerateToken(@RequestBody AuthRequest authReq) {

		Authentication authenticate = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(authReq.getUsername(), authReq.getPassword()));

		String Token = null;
		if (authenticate.isAuthenticated()) {
			Token = jwtService.generateToken(authReq.getUsername());
			logger.info("JWT Token successfully generated!!!");
		}

		else {
			logger.info("Not Found USERNAME!!!!");
			throw new UsernameNotFoundException("UserName Not Found!!!! ");
		}
		return Token;

	}
	
	
	@GetMapping("/getrole/{username}")
	public String getAuthenticationRole(@PathVariable String username)
	{
		return adminService.getLoginRole(username);
	}


}
