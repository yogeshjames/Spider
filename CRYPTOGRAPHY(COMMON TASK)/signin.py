import os
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization

# Sign a file using private key
def sign_file(file_path, private_key):
    # Load private key from PEM format
    private_key = serialization.load_pem_private_key(
        private_key,
        password=None  # No password protection
    )
    
    # Read file content
    with open(file_path, "rb") as file:
        file_data = file.read()
    
    # Calculate SHA-256 hash of file data
    hasher = hashes.Hash(hashes.SHA256())
    hasher.update(file_data)
    file_hash = hasher.finalize()
    
    # Sign hash using private key
    signature = private_key.sign(
        file_hash,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    
    # Save signature to file
    signature_file = file_path + ".signature"
    with open(signature_file, "wb") as sig_file:
        sig_file.write(signature)
    
    print(f"Digital signature generated and saved as {signature_file}")

# Example usage:
if __name__ == "__main__":
    # Import private_key from generation script
    from generation import private_key

    file_to_sign = "yogesh.txt"
    sign_file(file_to_sign, private_key)
