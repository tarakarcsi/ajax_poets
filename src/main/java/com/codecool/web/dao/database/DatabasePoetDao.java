package com.codecool.web.dao.database;

import com.codecool.web.dao.PoetDao;
import com.codecool.web.model.Poet;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public final class DatabasePoetDao extends AbstractDao implements PoetDao {

    public DatabasePoetDao(Connection connection) {
        super(connection);
    }

    public List<Poet> findAll() throws SQLException {
        String sql = "SELECT id, email, password FROM poets";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            List<Poet> poets = new ArrayList<>();
            while (resultSet.next()) {
                poets.add(fetchPoet(resultSet));
            }
            return poets;
        }
    }

    @Override
    public Poet findByEmail(String email) throws SQLException {
        if (email == null || "".equals(email)) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        String sql = "SELECT id, email, password FROM poets WHERE email = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchPoet(resultSet);
                }
            }
        }
        return null;
    }

    private Poet fetchPoet(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("id");
        String email = resultSet.getString("email");
        String password = resultSet.getString("password");
        return new Poet(id, email, password);
    }
}
