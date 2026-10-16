# My Landing Page
Led the Java 17 → 21 and Spring Boot 3.5.17 upgrade across the Alerts, Transaction Data Access (TDA), and Transaction (TXN) banking microservices.
Developed Resilience4j circuit breakers with fallback handling for third party transaction enrichment (Personetics) in TDA, isolating downstream timeouts so core transaction requests kept succeeding during enrichment outages. 
Implemented Kubernetes liveness/readiness probes and Istio canary deployments via Helm charts and ArgoCD, enabling zero-downtime, traffic weighted releases.
Developed Python tooling on the Dynatrace Grail (DQL) API to export traces, exceptions, and logs, reporting p50/p90/p99 latency and microservice bottlenecks from production traffic.
Moved hardcoded LaunchDarkly SDK keys and keystore credentials into Hashicorp Vault via Kubernetes ExternalSecrets, resolving Appsec findings for said services above.

Software Developer - Contract           	        	        	        	                                	    Jan 2023 - Sep 2024
BOTR Solutions	                       	                                	        	        	 	   	                		  Remote
Migrated AngularJS components to React 18 using react2angular, enabling incremental feature delivery during the migration; optimized components to cut initial load time by 20%.
Built Spring Boot/WebFlux REST services with JPA/Hibernate, plus JWT authentication and role-based access control, backed by JUnit/Mockito tests.
Built ETL pipelines to transform Firestore (NoSQL) metadata and trigger downstream Cloud Run services via GCP Pub/Sub, enabling efficient and actionable data insights in real time for stakeholders.
Modernized a Django/MySQL codebase from Python 2 to Python 3 and extended its REST API and test suite.
