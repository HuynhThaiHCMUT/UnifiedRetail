import { DialogType } from '@/utils/dialog.slice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Dialog, Button, Stack, Text, getThemes } from 'tamagui';

interface IconDialogProps {
    type: DialogType;
    title: string;
    message: string;
    open: boolean;
    onClose: () => void;
  }

const typeColors: Record<DialogType, 'red' | 'blue' | 'yellow'> = {
    error: 'red',
    info: 'blue',
    warning: 'yellow',
};

const typeIcons: Record<DialogType, 'alert-circle' | 'information' | 'alert'> = {
    error: 'alert-circle',
    info: 'information',
    warning: 'alert',
};

export function IconDialog({ open, type, title, message, onClose }: IconDialogProps) {
    const scheme = useColorScheme()
    const themeName = `${scheme}_${typeColors[type]}`
    const theme = getThemes()
    return (
        <Dialog open={open} onOpenChange={() => {
            if (!open) {
                onClose()
            }
        }}>
            <Dialog.Portal>
                <Dialog.Overlay themeInverse opacity={0.1} />
                <Dialog.Content
                    elevate
                    key="content"
                    background="$background"
                    rounded="$4"
                    paddingBlock="$6"
                    width="$20"
                >
                    <Stack items="center">
                        <MaterialCommunityIcons
                            name={typeIcons[type]}
                            size={48}
                            color={theme[themeName].colorFocus?.val}
                        />
                        <Dialog.Title fontSize="$6" fontWeight="bold">
                            {title}
                            </Dialog.Title>
                        <Text fontSize="$4" marginBlockStart="$2" text="center">
                            {message}
                        </Text>
                        <Button
                            marginBlockStart="$4"
                            theme={typeColors[type]}
                            onPress={() => onClose()}
                            width="$12"
                        >
                            OK
                        </Button>
                    </Stack>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )
}
