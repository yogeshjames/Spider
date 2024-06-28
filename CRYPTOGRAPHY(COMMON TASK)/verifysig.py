# verify_signature.py
import os
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization

# Verify signature of a file using public key
def verify_signature(file_path, signature_file, public_key):
    # Load public key from PEM format
    public_key = serialization.load_pem_public_key(
        public_key
    )
    
    # Read original file content
    with open(file_path, "rb") as file:
        original_file_data = file.read()
    
    # Read signature from file
    with open(signature_file, "rb") as sig_file:
        signature = sig_file.read()
    
    # Calculate SHA-256 hash of original file data
    hasher = hashes.Hash(hashes.SHA256())
    hasher.update(original_file_data)
    file_hash = hasher.finalize()
    
    # Verify signature against file hash using public key
    try:
        public_key.verify(
            signature,
            file_hash,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        print("Signature verification successful: File integrity maintained.")
    except Exception as e:
        print(f"Signature verification failed: {e}")

# Example usage:
if __name__ == "__main__":
    from generation import public_key  # Import public_key from key generation script
    
    file_to_verify = "yogesh.txt"  # Adjust this to the actual path of your example.txt file
    signature_to_verify = "yogesh.txt.signature"  # Adjust this if your signature file has a different naming convention
    verify_signature(file_to_verify, signature_to_verify, public_key)
