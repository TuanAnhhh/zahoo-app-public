import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
// import "react-awesome-lightbox/build/style.css";
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: "100%",
    },
    msg:{
      backgroundColor:theme.palette.grey[100],
      padding:".5rem 1rem",
      textAlign:"center",
      width:"100%",
      borderRadius:".5rem"
    }
  }));
function ListImage({itemData}) {
    const classes = useStyles();
    const [isShowFullImage, setIsShowFullImage] = useState(false)
    let images = itemData?.map((item,index) => {
      return {
        url:item.media.url,
        title:item.media.url,
      }
    })
    const handleViewFullImage = () => {
      setIsShowFullImage(true)
     }
    return (
        <div className={classes.root}>
           {isShowFullImage && 
            <Lightbox
                images={images}
                onClose={()=> setIsShowFullImage(false)}
            />
        }
          {itemData?.length ===0?
             <div className={classes.msg}>Chưa có ảnh/vieo được chia sẻ trong cuộc hội thoại này</div>
             :<ImageList rowHeight={160} className={classes.imageList} cols={3}>
                {itemData?.map((item,index) => (
                    <ImageListItem key={index} cols={1} onClick={handleViewFullImage} >
                    <img src={item.media.url} alt="image1" />
                    </ImageListItem>
                  ))
                }
             </ImageList>
          }
         
      </div>
    )
}

export default ListImage
