import React from 'react'
import {CardContent,Card,Typography,Grid,Button } from '@mui/material'
import useStyle from './style'

export default function EmojItem(props) {
    const classes = useStyle();
    function onClick(){
        navigator.clipboard.writeText(props.emoji);
    }
  return (
    <Grid item>
        <Button style={{textTransform: 'none'}} onClick={onClick}>
            <Card elevation={8}>
                <CardContent className={classes.emojiItemBox}>
                <Typography variant='h3' className={classes.emojiItem}>{props.emoji}</Typography>
                <Typography variant='h6' >{props.title}</Typography>
                </CardContent>
            </Card>
        </Button>
    </Grid>
  )
}
