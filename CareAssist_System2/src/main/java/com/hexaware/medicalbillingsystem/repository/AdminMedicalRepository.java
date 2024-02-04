package com.hexaware.medicalbillingsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hexaware.medicalbillingsystem.entities.AdminMedical;
/*
@Author:Hema sree
Date:15-11-2023
Description: Repository class for AdminMadical performing the following properties
*/	
@Repository
public interface AdminMedicalRepository extends JpaRepository<AdminMedical, Integer> {
	
	Optional<AdminMedical> findByAdminName(String adminName);
	
	 @Query("SELECT admin.role FROM AdminMedical admin WHERE admin.adminName = :adminName ")
	   public String findRoleByAdminName(@Param("adminName") String adminName);

}
