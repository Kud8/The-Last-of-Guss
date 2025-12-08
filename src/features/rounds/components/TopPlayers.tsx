import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import GlassPaper from '../../../shared/ui/GlassPaper'

interface TopRow {
  taps: number
  score: number
  user: { username: string }
}

interface Props {
  top: TopRow[]
}

function TopPlayers({ top }: Props) {
  return (
    <GlassPaper>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Топ игроков
      </Typography>
      <List dense>
        {top.map((row, idx) => (
          <ListItem key={`${row.user.username}-${idx}`} disableGutters>
            <ListItemText
              primary={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: 14,
                      bgcolor: idx === 0 ? 'primary.main' : 'grey.800',
                      color: idx === 0 ? 'primary.contrastText' : 'grey.100',
                    }}
                  >
                    {row.user.username[0] ?? '?'}
                  </Avatar>
                  <Typography variant="body2" fontWeight={idx === 0 ? 700 : 400}>
                    {row.user.username}
                  </Typography>
                  {idx === 0 && <Chip label="Победитель" size="small" color="success" sx={{ height: 22 }} />}
                </Stack>
              }
              secondary={
                <Typography variant="caption" color="grey.400">
                  taps: {row.taps} • score: {row.score}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </GlassPaper>
  )
}

export default TopPlayers

