import React from "react";
import DashboardContent from "./DashboardContent";
import CustomerHome from "./CustomerHome";
import {Container, Typography } from '@mui/material';


const Home = (props) => {

    const { userData } = props

    return (
        
        <Container>
            {
                (() => {

                    // Customer Home Page
                    if (userData.account_type === 'CUSTOMER')
                        return <CustomerHome />

                    // Admin Dashboard Page
                    else if (userData.account_type === 'ADMIN') 
                        return <DashboardContent />
                    
                    // Logged Out Home Page
                    else
                        return <Typography>logged out user</Typography>
                    
                })()
            }

        </Container>
    )    
}

export default Home;
