import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Dialog, Box, Input, Autocomplete, Stack, Button } from '@shared/ui';
import { useAuth, useUsers } from '@shared/auth';
import { useDiagram } from '@shared/canvas';

interface UsersListItem {
  label: string;
  value: string;
}

interface ShareDiagramDialogProps {
  id: string;
}

const ShareDiagramDialog = forwardRef(
  ({ id }: ShareDiagramDialogProps, ref) => {
    const [open, setOpen] = useState(false);
    const [shareInfo, setShareInfo] = useState<UsersListItem | null>(null);
    const [users, setUsers] = useState<UsersListItem[]>([]);
    const { user } = useAuth();

    const { getUsers } = useUsers();
    const { shareDiagram } = useDiagram();

    useImperativeHandle(ref, () => ({
      close: () => setOpen(false),
      open: () => setOpen(true),
    }));

    const handleClose = () => {
      setOpen(false);
    };

    const handleShare = async () => {
      const shareWith = shareInfo?.value;
      if (!shareWith) return;
      await shareDiagram(id, shareWith);
    };

    useEffect(() => {
      const fetchUsers = async () => {
        const usersList = await getUsers();
        setUsers(
          usersList.reduce((list: UsersListItem[], { email, uid }) => {
            if (uid !== user?.id) {
              list.push({
                label: email,
                value: uid,
              });
            }
            return list;
          }, [] as UsersListItem[])
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
            value={shareInfo}
            options={users || []}
            sx={{ width: 300, height: 300 }}
            onChange={(_, item) => {
              setShareInfo(item);
            }}
            renderInput={(params) => (
              <Input {...params} placeholder="Share with.." />
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
  }
);

export default ShareDiagramDialog;
