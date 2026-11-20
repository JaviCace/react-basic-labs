import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';



const priorityColors = {
    High: "red",
    Medium: "orange",
    Low: "green"
};


const Task = (props) => {
    
    return (
          <Grid
  key={props.id}
  size={{ xs: 12, md: 4 }}
>
  <Card
    sx={{
      backgroundColor: props.done ? 'lightgrey' : 'lightblue',
      padding: '20px'
    }}
  >
    <CardHeader
      title={props.title}
      sx={{
        backgroundColor: 'white',
        borderRadius: '3px',
        padding: '20px',
        textAlign: 'center'
      }}
    />

    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          mb: 2,
          padding: '20px'
        }}
      >
        <Typography
          component="p"
          variant="subtitle2"
          color="text.primary"
        >
          Due: {props.deadline}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Chip
          label={props.priority}
          size="small"
          sx={{
            backgroundColor: priorityColors[props.priority] || 'grey',
            color: 'white'
          }}
        />
      </Box>

      <Typography
        component="p"
        variant="subtitle1"
        align="center"
        sx={{ fontStyle: 'italic' }}
      >
        {props.description}
      </Typography>
    </CardContent>

    <CardActions
      sx={{
        justifyContent: 'space-between',
        padding: '20px'
      }}
    >
      <Button
        variant="contained"
        size="small"
        color="success"
        startIcon={<CheckCircleIcon />}
        onClick={props.markDone}
      >
        Done
      </Button>

      <Button
        variant="contained"
        size="small"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={props.deleteTask}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
</Grid>

    )
}

export default Task;