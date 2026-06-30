import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Rating,
  CardActions,
} from '@mui/material'
import { Favorite, FavoriteBorder, RemoveRedEye } from '@mui/icons-material'
import { motion } from 'framer-motion'

import { ProductDialog, CartActionsButton } from 'components'
import PriceDisplay from './PriceDisplay'

const MotionCard = motion(Card)

const DefaultProductView = ({
  product,
  finalPrice,
  quickView,
  isDialogOpen,
  handleQuickView,
  addToFavourites,
  removeFromFavourites,
  isFavourite,
  navigate,
  handleAdd,
  handleRemove,
  getQuantity,
  itemIds,
}) => (
  <MotionCard
    whileHover={{ y: -6, boxShadow: '0px 12px 30px rgba(0,0,0,0.12)' }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    sx={{
      margin: 1,
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      '&:hover #hidden-menu-fav-eye': {
        opacity: 1,
        transition: 'opacity 0.25s',
      },
    }}
  >
    {/* Quick View and Favorites */}
    <Box
      id="hidden-menu-fav-eye"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 10,
        right: 10,
        opacity: 0, // Initially hidden
        transition: 'opacity 0.25s',
        gap: 1,
        zIndex: 10,
      }}
    >
      {/* Quick View Button */}
      <IconButton onClick={handleQuickView} sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f5f5f5' } }}>
        <RemoveRedEye sx={{ color: 'rgba(174, 180, 190, 1)' }} />
      </IconButton>

      {/* Favorite Button */}
      {!isFavourite(product._id) ? (
        <IconButton onClick={() => addToFavourites(product)} sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f5f5f5' } }}>
          <FavoriteBorder sx={{ color: 'rgba(174, 180, 190, 1)' }} />
        </IconButton>
      ) : (
        <IconButton onClick={() => removeFromFavourites(product._id)} sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f5f5f5' } }}>
          <Favorite sx={{ color: 'crimson' }} />
        </IconButton>
      )}
    </Box>

    {/* Discount Badge */}
    {!!product.discountPercentage && (
      <Chip
        label={`${product.discountPercentage.toFixed(0)}% off`}
        color="primary"
        size="small"
        sx={{ px: 0.5, position: 'absolute', top: 10, left: 10, fontWeight: 600, zIndex: 10 }}
      />
    )}

    {/* Product Image */}
    <Box
      sx={{
        height: 300,
        width: '100%',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <Box
        component="img"
        src={product.thumbnail}
        alt={product.title}
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
          transition: 'transform 0.4s ease-out',
          '&:hover': {
            transform: 'scale(1.08)',
          },
        }}
      />
    </Box>

    {/* Product Details */}
    <Box display="flex" p={2}>
      <CardContent sx={{ width: '100%', p: 0 }}>
        <Tooltip title={product.title}>
          <Typography
            variant="h3"
            component="div"
            noWrap
            sx={{
              fontSize: '14px !important',
              fontWeight: 600,
              mb: 1,
              maxWidth: { xs: '9rem', sm: '12rem', xl: '13rem' },
            }}
          >
            {product.title}
          </Typography>
        </Tooltip>
        <Rating value={product.rating} readOnly size="medium" sx={{ fontSize: '1.25rem' }} />
        <Box mt={1}>
          <PriceDisplay quickView={quickView} product={product} finalPrice={finalPrice} />
        </Box>
      </CardContent>
      <CardActions
        sx={{
          width: 30,
          p: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <CartActionsButton
          inCart={itemIds.includes(product._id)}
          quantity={getQuantity(product._id)}
          stock={product.stock}
          onAdd={handleAdd}
          onRemove={handleRemove}
          buttonSize="small"
          layoutStyle="icon-buttons"
        />
      </CardActions>
    </Box>

    {/* Quick View Dialog */}
    {isDialogOpen && (
      <ProductDialog
        isDialogOpened={isDialogOpen}
        thumbnail={product.thumbnail}
        productId={product._id}
        handleCloseDialog={handleQuickView}
      />
    )}
  </MotionCard>
)

export default DefaultProductView
