import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FC } from 'react';
import { IpropsData } from '../utils/types/types';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from 'react-redux';
import { handleLike } from '../store/slices/likePost';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useIsLiked from '../utils/hooks/useIsLiked';


interface IPopupModalProps {
  open: boolean;
  data: IpropsData[];
  handlePrevImage: () => void;
  handleNextImage: () => void;
  currentIndex: number;
  handleClose: () => void;
}

const PopupModal: FC<IPopupModalProps> = ({
  open,
  handlePrevImage,
  currentIndex,
  handleClose,
  handleNextImage,
  data,
}) => {

  const isLiked = useIsLiked(data[currentIndex]?.id);

  const dispatch= useDispatch();

  return (
    <>
      <Dialog
        className="custom_modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            width: '95%',
            maxWidth: '680px',
            overflowY: 'unset',
            margin: '0px',
            maxHeight: 'auto',
          },
        }}
      >
        <DialogActions>
          <IconButton
            onClick={handleClose}
            sx={{ padding: '0px', marginTop: '5px', marginRight: '5px' }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogActions>

        {/* image-like content-below */}
        <Box className="ModelaspectImgs" sx={{ position: 'relative' }}>
          <img src={data[currentIndex]?.urls.regular} alt="" />
          
          <IconButton className="like_btn" onClick={() => data[currentIndex]&&(dispatch(handleLike(data[currentIndex]))) }>
          {isLiked ? <FavoriteIcon style={{ color: '#f5167f' }} /> : <FavoriteBorderIcon />}
        </IconButton>
          <Link
            to={data[currentIndex]?.urls.regular}
            className="img_downLoadBtn"
            download
            target="\blank"
          >
            <IconButton>
              <FileDownloadOutlinedIcon />
            </IconButton>
          </Link>
          <IconButton className="slider_btns left" onClick={handlePrevImage}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton className="slider_btns right" onClick={handleNextImage}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        {/* image-like content-ends-here */}
        <DialogContent
          sx={{
            padding: '12px',
            overflowY: 'unset !Important',
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: { xs: '13px', md: '15px' } }}
          >
            <Typography gutterBottom variant="h3">
              {data[currentIndex]?.user.first_name}
            </Typography>

            <Typography gutterBottom variant="h6" color={'#000'}>
              {data[currentIndex]?.alt_description}
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupModal;
