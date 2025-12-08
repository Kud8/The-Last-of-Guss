import { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

dayjs.extend(isSameOrBefore)

export interface CreateRoundFormValues {
  startTime: Dayjs | null
  endTime: Dayjs | null
  totalScore: string
}

export interface CreateRoundDialogProps {
  open: boolean
  loading: boolean
  onClose: () => void
  onSubmit: (payload: { startTime: string; endTime: string; totalScore: number }) => void
}

function CreateRoundDialog({ open, loading, onClose, onSubmit }: CreateRoundDialogProps) {
  const [form, setForm] = useState<CreateRoundFormValues>({
    startTime: dayjs(),
    endTime: dayjs().add(1, 'minute'),
    totalScore: '0',
  })

  const startInvalid = !form.startTime || !form.startTime.isValid()
  const endInvalid = !form.endTime || !form.endTime.isValid()
  const durationInvalid = !startInvalid && !endInvalid && form.endTime!.isSameOrBefore(form.startTime!)
  const totalScoreNumber = Number(form.totalScore)
  const totalInvalid = Number.isNaN(totalScoreNumber) || totalScoreNumber < 0
  const formError =
    (startInvalid && 'Укажите корректное время начала') ||
    (endInvalid && 'Укажите корректное время окончания') ||
    (durationInvalid && 'Окончание должно быть позже начала') ||
    (totalInvalid && 'Total score должно быть числом ≥ 0') ||
    ''

  const canSubmit = useMemo(() => !formError, [formError])

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit({
      startTime: form.startTime!.toISOString(),
      endTime: form.endTime!.toISOString(),
      totalScore: totalScoreNumber,
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: 'rgba(15,23,42,0.96)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'white',
          boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
        },
      }}
    >
      <DialogTitle sx={{ color: 'white' }}>Создать раунд</DialogTitle>
      <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
        <Stack spacing={2}>
          <DateTimePicker
            label="Начало"
            value={form.startTime}
            onChange={(v) => setForm((prev) => ({ ...prev, startTime: v }))}
            ampm={false}
            timeSteps={{ minutes: 1 }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: startInvalid || durationInvalid,
                helperText: startInvalid ? 'Укажите дату и время' : durationInvalid ? 'Должно быть раньше окончания' : '',
                InputLabelProps: { sx: { color: '#e2e8f0' } },
                InputProps: {
                  sx: {
                    color: '#f8fafc',
                    background: 'rgba(255,255,255,0.06)',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.18)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(124,58,237,0.6)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7c3aed' },
                    '& .MuiSvgIcon-root': { color: '#e2e8f0' },
                  },
                },
              },
            }}
          />
          <DateTimePicker
            label="Окончание"
            value={form.endTime}
            onChange={(v) => setForm((prev) => ({ ...prev, endTime: v }))}
            ampm={false}
            timeSteps={{ minutes: 1 }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: endInvalid || durationInvalid,
                helperText: endInvalid ? 'Укажите дату и время' : durationInvalid ? 'Должно быть позже начала' : '',
                InputLabelProps: { sx: { color: '#e2e8f0' } },
                InputProps: {
                  sx: {
                    color: '#f8fafc',
                    background: 'rgba(255,255,255,0.06)',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.18)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(124,58,237,0.6)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7c3aed' },
                    '& .MuiSvgIcon-root': { color: '#e2e8f0' },
                  },
                },
              },
            }}
          />
          <TextField
            label="Total score"
            type="number"
            value={form.totalScore}
            onChange={(e) => setForm((prev) => ({ ...prev, totalScore: e.target.value }))}
            inputProps={{ min: 0 }}
            fullWidth
            error={totalInvalid}
            helperText={totalInvalid ? 'Введите число ≥ 0' : ''}
            InputLabelProps={{ sx: { color: '#e2e8f0' } }}
            InputProps={{
              sx: {
                color: '#f8fafc',
                background: 'rgba(255,255,255,0.06)',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.18)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(124,58,237,0.6)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7c3aed' },
              },
            }}
          />
          {formError && <Alert severity="error">{formError}</Alert>}
          <Alert severity="info" icon={false}>
            Укажите время начала и конца раунда и итоговый totalScore. Время окончания должно быть позже начала.
          </Alert>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Отмена
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || Boolean(formError)}
          startIcon={loading ? <CircularProgress color="inherit" size={16} /> : null}
        >
          {loading ? 'Создаем...' : 'Создать'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateRoundDialog

