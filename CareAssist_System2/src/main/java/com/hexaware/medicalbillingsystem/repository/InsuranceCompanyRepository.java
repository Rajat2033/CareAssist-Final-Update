package com.hexaware.medicalbillingsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.hexaware.medicalbillingsystem.entities.InsuranceCompany;
/*
@Author : Hema Sree   
Modified Date :08-11-2023
Description : Repository for InsuranceCompany class extending JpaRepository
*/

@Repository
public interface InsuranceCompanyRepository extends JpaRepository<InsuranceCompany, Integer> {

	
	Optional<InsuranceCompany> findByCompanyName(String companyName);
	
	 @Query("SELECT company.role FROM InsuranceCompany company WHERE company.companyName = :companyName ")
	  public  String findRoleByCompanyName(@Param("companyName") String companyName);
}
