package com.localhub.backend;

import com.localhub.backend.repository.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PartnerProfileRepository partnerProfileRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private DealRedemptionRepository dealRedemptionRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TicketClaimRepository ticketClaimRepository;

    @Autowired
    private ReferralClickRepository referralClickRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Test
    void contextLoads() {
        Assertions.assertNotNull(userRepository);
        Assertions.assertNotNull(partnerProfileRepository);
        Assertions.assertNotNull(categoryRepository);
        Assertions.assertNotNull(listingRepository);
        Assertions.assertNotNull(dealRepository);
        Assertions.assertNotNull(dealRedemptionRepository);
        Assertions.assertNotNull(eventRepository);
        Assertions.assertNotNull(ticketClaimRepository);
        Assertions.assertNotNull(referralClickRepository);
        Assertions.assertNotNull(reviewRepository);
        Assertions.assertNotNull(notificationRepository);
    }

}
