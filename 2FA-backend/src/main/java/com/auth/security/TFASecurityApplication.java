package com.auth.security;

import com.auth.security.auth.AuthenticationService;
import com.auth.security.auth.RegisterRequest;
import com.auth.security.user.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TFASecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(TFASecurityApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(AuthenticationService service) {
		return args -> {
			var admin = RegisterRequest.builder()
					.firstname("ADMIN")
					.lastname("ADMIN")
					.email("admin@mail.ru")
					.password("admin")
					.role(Role.ADMIN)
					.mfaEnabled(true)
					.build();
			System.out.println("Admin token: " + service.register(admin).getAccessToken());
			var manager = RegisterRequest.builder()
					.firstname("MANAGER")
					.lastname("MANAGER")
					.email("manager@mail.ru")
					.password("manager")
					.role(Role.MANAGER)
					.build();
			System.out.println("Manager token: " + service.register(manager).getAccessToken());
		};
	}
}
