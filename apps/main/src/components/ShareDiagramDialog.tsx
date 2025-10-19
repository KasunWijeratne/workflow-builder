import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dialog, Box, Input, Autocomplete, Stack, Button } from '@shared/ui';
import { useUsers } from '@shared/auth';

interface UsersListItem {
  label: string;
  value: string;
}

const ShareDiagramDialog = forwardRef((_, ref) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UsersListItem[]>([]);

  const shareInfoRef = useRef<HTMLInputElement>(null);
  const { getUsers } = useUsers();

  useImperativeHandle(ref, () => ({
    close: () => setOpen(false),
    open: () => setOpen(true),
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleShare = () => {
    console.log('shareInfoRef.current', shareInfoRef.current?.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(
        usersList.map((user) => ({
          label: user.email,
          value: user.uid,
        }))
      );
    };

    fetchUsers();
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: 2, width: 400 }}>
        <h2>Share Diagram</h2>
        <Autocomplete
          disablePortal
          options={users || []}
          sx={{ width: 300, height: 300 }}
          renderInput={(params) => (
            <Input
              inputRef={shareInfoRef}
              {...params}
              placeholder="Share with.."
            />
          )}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="text" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleShare}>
            Share
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
});

export default ShareDiagramDialog;
