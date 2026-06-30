import StarPurple500Icon from '@mui/icons-material/StarPurple500'
import { Box, Typography, CardActionArea, CardMedia } from '@mui/material'
import { featuredBrandsDetails } from 'views/Home/data/data'
import Section from '../Section/Section'

const FeaturedBrands = () => {
  return (
    <Section
      title="Featured Brands"
      icon={<StarPurple500Icon color="warning" />}
      data={featuredBrandsDetails}
      buttonLink="#"
      gridSpacing={4}
      itemBreakpoints={{ xs: 12, sm: 6 }}
      renderItem={(item) => (
        <Box>
          <CardActionArea sx={{ mb: 1, borderRadius: '8px', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              loading="lazy"
              height={170}
              image={item.imageURL}
              alt={item.title}
              sx={{
                borderRadius: '8px',
                transition: 'transform 0.4s ease-out',
                '&:hover': {
                  transform: 'scale(1.06)',
                },
              }}
            />
          </CardActionArea>
          <Typography variant="h6" sx={{ fontSize: '14px !important', fontWeight: 600 }}>
            {item.title}
          </Typography>
        </Box>
      )}
    />
  )
}

export default FeaturedBrands
