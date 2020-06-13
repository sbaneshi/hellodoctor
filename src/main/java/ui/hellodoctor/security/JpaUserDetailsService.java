package ui.hellodoctor.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.data.domain.Patient;
import ui.hellodoctor.data.domain.User;
import ui.hellodoctor.data.repository.DoctorRepository;
import ui.hellodoctor.data.repository.PatientRepository;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JpaUserDetailsService implements UserDetailsService {

    private final DoctorRepository doctorRepo;
    private final PatientRepository patientRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Patient> optPatient = patientRepo.findByPhoneNumber(username);
        if (optPatient.isPresent()) {
            return getUserDetails(optPatient.get(), Collections.singleton(SecurityUtils.ROLE_PATIENT));
        }

        Optional<Doctor> optDoctor = doctorRepo.findByPhoneNumber(username);
        if (optDoctor.isPresent()) {
            return getUserDetails(optDoctor.get(), Collections.singleton(SecurityUtils.ROLE_DOCTOR));
        }

        throw new UsernameNotFoundException("Cannot find username=" + username);
    }

    private UserDetails getUserDetails(User user, Set<String> roles) {
        return new org.springframework.security.core.userdetails.User(
                user.getPhoneNumber(), user.getPassword(),
                roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toSet())
        );
    }
}
