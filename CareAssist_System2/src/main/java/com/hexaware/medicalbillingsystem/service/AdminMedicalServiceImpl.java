package com.hexaware.medicalbillingsystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.medicalbillingsystem.dto.AdminMedicalDTO;
import com.hexaware.medicalbillingsystem.entities.AdminMedical;
import com.hexaware.medicalbillingsystem.repository.AdminMedicalRepository;
import com.hexaware.medicalbillingsystem.repository.HealthcareProviderRepository;
import com.hexaware.medicalbillingsystem.repository.InsuranceCompanyRepository;
import com.hexaware.medicalbillingsystem.repository.PatientRepository;

/*
@Author:Hema sree
Date:18-11-2023
Description:Service class for AdminMedical implenting IAdminMedicalService
*/

@Service
public class AdminMedicalServiceImpl implements IAdminMedicalService {

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	private AdminMedicalRepository repository;
	
	
	@Autowired
	private HealthcareProviderRepository providerRepo;
	
	@Autowired
	private InsuranceCompanyRepository companyRepo;
	
	@Autowired
	private PatientRepository patientRepo;
	

	@Override
	public AdminMedical insertNewAdmin(AdminMedicalDTO adminDTO) {
		AdminMedical admin = new AdminMedical();
		admin.setAdminName(adminDTO.getAdminName());
		admin.setAdminPassword(encoder.encode(adminDTO.getAdminPassword()));
		return repository.save(admin);
	}

	@Override
	public AdminMedical updateAdmin(AdminMedicalDTO adminDTO, int adminId) {
		Optional<AdminMedical> adminOpt = repository.findById(adminId);
		AdminMedical admin = new AdminMedical();
		if(adminOpt.isPresent())
		{
		admin=adminOpt.get();
		admin.setAdminPassword(encoder.encode(adminDTO.getAdminPassword()));
		}
		return repository.save(admin);
	}

	@Override
	public String getLoginRole(String username) {
		String role;
		String adminRole=repository.findRoleByAdminName(username);
		
		if(adminRole!=null)
		{
			role=adminRole;
		}
		else
		{
			String patientRole=patientRepo.findRoleByPatientName(username);
			
			if(patientRole!=null)
			{
				role=patientRole;
			}
			else
			{
				String companyRole=companyRepo.findRoleByCompanyName(username);
				if(companyRole!=null)
				{
					role=companyRole;
				}
				else
				{
					String providerRole=providerRepo.findRoleByProviderName(username);
					if(providerRole!=null)
					{
						role=providerRole;
					}
					else
					{
						throw new UsernameNotFoundException("Username not found "+username);
					}
				}
			}
		}
		
		return role;
		
	}

	
}
