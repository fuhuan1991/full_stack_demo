package com.my_portfolio.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  @Autowired
  private MyUserDetailService userDetailService;

  @Autowired
  private JwtUtil jwtUtil;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//    final String authorizationHeader = request.getHeader("Authorization");
    final String cookie = request.getHeader("cookie");

    String username = null;
    String jwt = null;

//    System.out.println("authorizationHeader: " + authorizationHeader);
//    System.out.println("---------filter-----------");

    String JwtCookiePattern = "jwt_token=([^;]*)[;]?";
    Pattern p = Pattern.compile(JwtCookiePattern);
    Matcher m = p.matcher(cookie);
    m.find();

    try{
      jwt = m.group(1);
      username = jwtUtil.extractUsername(jwt);
//      System.out.println("JWT found");
    } catch (Exception e) {
//      System.out.println("no JWT found");
//      System.out.println(e);
    }


//    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//      jwt = authorizationHeader.substring(7);
//      username = jwtUtil.extractUsername(jwt);
//    }

// todo: add more checking for getUserNote api

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = this.userDetailService.loadUserByUsername(username);
      if (jwtUtil.validateToken(jwt, userDetails)) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
      }
    }
    chain.doFilter(request, response);
  }
}
