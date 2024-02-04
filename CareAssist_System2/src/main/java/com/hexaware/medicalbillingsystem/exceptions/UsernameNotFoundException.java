package com.hexaware.medicalbillingsystem.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class UsernameNotFoundException extends ResponseStatusException{

	
	private static final long serialVersionUID = 1L;

	public UsernameNotFoundException(HttpStatusCode status,String reason) {
		super(status,reason);
		
	}

}
