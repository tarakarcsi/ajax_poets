package com.codecool.web.dao.database;

import com.codecool.web.dao.PoemDao;
import com.codecool.web.model.Poem;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabasePoemDao extends AbstractDao implements PoemDao {
    DatabasePoemDao(Connection connection) {
        super(connection);
    }

    @Override
    public List<Poem> findAll() throws SQLException {
        List<Poem> poems = new ArrayList<>();
        String sql = "SELECT poemId, title FROM poems";
        try(Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                poems.add(fetchPoem(resultSet));
            }
        }
        return poems;
    }

    private Poem fetchPoem(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("poemId");
        String title = resultSet.getString("title");
        return new Poem(id, title);
    }

    @Override
    public List<Poem> findAllByPoetId(int poetId) throws SQLException {
        List<Poem> poems = new ArrayList<>();
        String sql = "SELECT poemId, title FROM poems JOIN poets ON poems(poemId) = poets(id) WHERE poem.poemId = ?";
        try(PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, poetId);
            try(ResultSet rS = preparedStatement.executeQuery()) {
                while(rS.next()) {
                    poems.add(fetchPoem(rS));
                }
            }
        }
        return poems;
    }

    @Override
    public Poem findById(int id) throws SQLException {
        return null;
    }

    @Override
    public Poem add(String name) throws SQLException {
        return null;
    }
}
