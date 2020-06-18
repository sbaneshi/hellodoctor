package ui.hellodoctor.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.Assert;

public class BaseController {

    protected Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    protected User getUser() {
        return (User) getAuthentication().getPrincipal();
    }

    protected String getPhoneNumber() {
        return getUser().getUsername();
    }

    protected boolean hasRole(String role) {
        return getUser().getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(role));
    }

    protected void assertRole(String role) {
        Assert.isTrue(hasRole(role), "Role expected: " + role);
    }
}
