package com.hexaware.medicalbillingsystem.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.hexaware.medicalbillingsystem.entities.HealthcareProvider;
/*
@Author : Hema Sree 
Modified Date :08-11-2023
Description : Repository for HealthcareProvider class extending JpaRepository
*/
@Repository
public interface HealthcareProviderRepository extends JpaRepository<HealthcareProvider, Integer> {

	Optional<HealthcareProvider> findByProviderName(String companyName);
	
	 @Query("SELECT provider.role FROM HealthcareProvider provider WHERE provider.providerName = :providerName ")
	 public   String findRoleByProviderName(@Param("providerName") String providerName);
}
