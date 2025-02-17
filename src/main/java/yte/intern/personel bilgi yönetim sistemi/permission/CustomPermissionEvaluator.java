package yte.intern.personel.bilgi.yonetim.sistemi.permission;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Custom permission evaluator to check if the user has the required permission.
 * Usage:  @PreAuthorize("hasPermission(null, 'ROLE_INSTITUTE_BOARD')")
 */

@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {

    private final Map<String, String[]> roleHierarchyMap = new HashMap<>();

    public CustomPermissionEvaluator() {
        roleHierarchyMap.put("ROLE_SOFTWARE_DEVELOPMENT_TECHNOLOGIES", new String[]{ "ROLE_PROJECT_MANAGEMENT",
                "ROLE_SOFTWARE_ARCH_AND_INFR_MANG", "ROLE_SOFTWARE_DEVELOPMENT", "ROLE_OPEN_SRC_SOFTWARE_TECH" });
        roleHierarchyMap.put("ROLE_ENTERPRISE_RESOURCE_MANG", new String[]{"ROLE_PURCHASE", "ROLE_HUMAN_RESOURCES",
                "ROLE_EDUCATION_AND_ORGANIZATION"});
    }

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            if (hasRole(authority.getAuthority(), permission.toString())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        return hasPermission(authentication, null, permission);
    }

    private boolean hasRole(String userRole, String requiredRole) {
        if (userRole.equals(requiredRole)) {
            return true;
        }
        if (roleHierarchyMap.containsKey(userRole)) {
            for (String inheritedRole : roleHierarchyMap.get(userRole)) {
                if (hasRole(inheritedRole, requiredRole)) {
                    return true;
                }
            }
        }
        return false;
    }
}

