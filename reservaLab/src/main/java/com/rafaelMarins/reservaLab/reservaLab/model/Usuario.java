package com.rafaelMarins.reservaLab.reservaLab.model;

import jakarta.persistence.*;


@Entity
@Table(name = "usuario")

public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        PROFESSOR, ADMIN
    }

    public long setId() {
        return id;
    }

    public void getId(Long id){
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String Nome) {
        this.nome = nome;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String Email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String Senha) {
        this.senha = senha;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}
