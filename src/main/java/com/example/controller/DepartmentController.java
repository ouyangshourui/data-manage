package com.example.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.model.Department;
import com.example.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    
    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @GetMapping("/stats")
    public Map<String, Object> getDepartmentStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("count", departmentRepository.count());
        stats.put("lastUpdated", LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return stats;
    }
    /**
     * 根据部门名称查询部门信息
     * @param name
     * @return
     */
    @GetMapping("/byName")
    public ResponseEntity<?> getDepartmentByName(@RequestParam String name) {
        return departmentRepository.findByName(name)
            .map(department -> ResponseEntity.ok(department))
            .orElse(ResponseEntity.notFound().build());
    }
}