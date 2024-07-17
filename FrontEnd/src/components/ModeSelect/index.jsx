import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { useColorScheme } from '@mui/material'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'


function ModeSelect() {
    const { mode, setMode } = useColorScheme()
  
    const handleChange = (event) => {
      const selectedMode = event.target.value
      setMode(selectedMode)
    }
  
    return (
      // <FormControl size="small">
        <Select
          disableUnderline={true}
          variant="standard"
          labelId="label-dark-light-mode"
          id="label-dark-light-mode"
          value={mode}
          label="mode "
          onChange={handleChange}
          sx={{
            '& .css-499nkr-MuiSelect-select-MuiInputBase-input-MuiInput-input:focus': {
              backgroundColor: 'transparent',
              borderRadius: 0,
            },
          }}
        >
          <MenuItem value="light">
            <LightModeIcon fontSize='small'/>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DarkModeIcon fontSize='small'/>
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsBrightnessIcon fontSize='small'/>
            </Box>
          </MenuItem>
        </Select>
      // </FormControl>
    );
  }

export default ModeSelect