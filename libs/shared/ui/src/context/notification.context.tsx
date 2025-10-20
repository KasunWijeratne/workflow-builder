import {
  createContext,
  useContext,
  useState,
  useCallback,
  FC,
  PropsWithChildren,
} from 'react';
import { Card, Snackbar, Stack, Typography } from '@mui/material';
import {
  CheckCircleOutline,
  CircleNotificationsOutlined,
  ErrorOutlineOutlined,
} from '@mui/icons-material';

type Severity = 'info' | 'error' | 'success';

interface NotificationContextType {
  addNotification: (message: string, severity?: Severity) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notificationPack, setNotificationPack] = useState<
    { message: string; severity?: Severity; key: number }[]
  >([]);

  const addNotification = useCallback(
    (message: string, severity?: Severity) => {
      setNotificationPack((prev) => [
        ...prev,
        { message, severity, key: new Date().getTime() },
      ]);
    },
    []
  );

  const handleClose = (id: number) => () => {
    setNotificationPack((prev) => prev.filter((snack) => snack.key !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {notificationPack.map((snack) => (
        <Snackbar
          key={snack.key}
          open={true}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleClose(snack.key)}
        >
          <Card sx={{ p: 2, backgroundColor: 'white' }}>
            <Stack direction="row" gap={2}>
              <SeverityIcon severity={snack.severity || 'info'} />
              <Typography variant="body2">{snack.message}</Typography>
            </Stack>
          </Card>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

const SeverityIcon = ({ severity }: { severity: Severity }) => {
  switch (severity) {
    case 'error':
      return <ErrorOutlineOutlined sx={{ color: 'warning.main' }} />;
    case 'success':
      return <CheckCircleOutline sx={{ color: 'success.main' }} />;
    default:
      return <CircleNotificationsOutlined sx={{ color: 'text.secondary' }} />;
  }
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
