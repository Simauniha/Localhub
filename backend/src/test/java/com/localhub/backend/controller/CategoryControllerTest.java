package com.localhub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.localhub.backend.dto.CategoryRequest;
import com.localhub.backend.dto.CategoryResponse;
import com.localhub.backend.service.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class CategoryControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private CategoryService categoryService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    void testGetAllCategoriesPublic() throws Exception {
        CategoryResponse cat = CategoryResponse.builder()
                .id(1L)
                .name("Food & Dining")
                .slug("food-dining")
                .build();

        when(categoryService.getAllCategories()).thenReturn(List.of(cat));

        mockMvc.perform(get("/api/v1/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Food & Dining"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testCreateCategoryAdmin() throws Exception {
        CategoryRequest request = CategoryRequest.builder()
                .name("Education")
                .slug("education")
                .description("Coaching & Tuition")
                .build();

        CategoryResponse response = CategoryResponse.builder()
                .id(2L)
                .name("Education")
                .slug("education")
                .description("Coaching & Tuition")
                .build();

        when(categoryService.createCategory(any(CategoryRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("Education"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testCreateCategoryUserForbidden() throws Exception {
        CategoryRequest request = CategoryRequest.builder()
                .name("Education")
                .slug("education")
                .build();

        mockMvc.perform(post("/api/v1/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }
}
