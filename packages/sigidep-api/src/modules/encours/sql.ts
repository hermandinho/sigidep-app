export const encours_query = `
SELECT  Exo.code 
AS code_exercice, CONCAT (SP.code,' - ',SP.label_fr) 
AS sous_programme, CONCAT (AC.code,' - ',AC.label_fr) 
AS actions, CONCAT (ACT.code,' - ',ACT.label_fr) 
AS activite, CONCAT (TSK.code,' - ',TSK.label_fr) 
AS tache, CONCAT (UA.code, ' - ',UA.label_fr) 
AS unites_administratives, CONCAT(para.code,' - ',para.label_fr) 
AS paragraphe,  OP.imputation, OP.label_fr 
AS libelle_operation_fr, OP.deliverable_fr 
AS livrable_fr , OP.verification_source_fr 
AS source_verification_fr, OP.manager_name 
AS gestionnaire, OP.management_mode 
AS mode_gestion, OP.credit_n1 
AS CP_Initial, OP.engagement_authorization 
AS AE_Initial, para.label_fr 
AS libelle_paragraphe_fr, para.label_en 
AS libelle_paragraphe_en, CONCAT (SF.code, ' - ', SF.abbreviation_fr) 
AS source_financement, CONCAT(R.code, ' - ',R.label_fr) 
AS region, CONCAT (D.code, ' - ',D.label_fr) 
AS departement, CONCAT (AR.code, ' - ',AR.label_fr) 
AS arrondissement, OP.locality, UPRef.code 
AS code_unite_physique, UPRef.label_fr 
AS libelle_unite_physique, UP.quantity 
AS qte_unite_physique, UP.unit_price 
AS pu_unite_physique, UP.total_price 
AS montant_unite_physique, OP.id 
AS operation_id    FROM Public.sub_program_activity_task_operations OP
		JOIN Public.paragraphs para
	    	ON OP.paragraph_id = para.id
		JOIN Public.financial_sources SF
	    	ON para.financial_source_id = SF.id
		JOIN Public.regions R
	    	ON OP.region_id = R.id
		JOIN Public.departments D
	    	ON OP.department_id = D.id
		JOIN Public.arrondissements AR
	    	ON OP.arrondissement_id = AR.id
		LEFT OUTER JOIN Public.sub_program_activity_task_operation_physical_units UP
	    	ON OP.id = UP.operation_id
		LEFT OUTER JOIN Public.reference_physical_units UPRef
	    	ON UP.reference_physical_unit_id = UPRef.id
		LEFT JOIN Public.sub_program_activity_tasks TSK
	    	ON OP.task_id = TSK.id
		JOIN Public.administrative_units UA
	    	ON TSK.administrative_unit_id = UA.id
		LEFT JOIN Public.sub_program_activities ACT
	    	ON TSK.activity_id = ACT.id
		LEFT JOIN Public.sub_program_actions AC
	    	ON ACT.action_id = AC.id
		LEFT JOIN Public.sub_programs SP
        ON AC.sub_program_id = SP.id
        LEFT OUTER JOIN Public.exercices Exo
        ON SP.exercise_id = Exo.id
																						
ORDER BY OP.id ASC ;
`;
